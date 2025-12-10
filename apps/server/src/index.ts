import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { redis } from "./redis";
import { UserSocketMap } from "./sockets/UserSocketMap";
import { registerRoomEvents } from "./sockets/roomEvents";
import { registerGameEvents } from "./sockets/gameEvents";
import { authRouter } from "./modules/auth/auth.router";
import { verifyJwt } from "./lib/jwt";
import healthRouter from "./modules/health/health.router";

const pubClient = redis;
const subClient = redis.duplicate();

/// START OF EXPRESS CONFIGURATION ///

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/health", healthRouter);
app.get("/", (req, res) => {
  res.send("Funloop Server Running");
});

// END OF EXPRESS CONFIGURATION //

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
  // Verify socket and get user id
  try {
    const decoded = verifyJwt(socket.handshake.auth.token);

    socket.data.userId = decoded.userId;
    socket.data.isGuest = decoded.isGuest;

    UserSocketMap.bind(decoded.userId, socket.id);

    console.log("Connected:", socket.id);

    // Register socket events
    registerRoomEvents(io, socket);
    registerGameEvents(io, socket);

    socket.on("disconnect", () => {
      UserSocketMap.unbind(decoded.userId);
      console.log("Disconnected:", socket.id);
    });
  } catch {
    socket.emit("error", "Invalid Authentication");
    socket.disconnect(true);
  }
});
subClient.subscribe("match-found");

subClient.on("message", async (channel, msg) => {
  if (channel === "match-found") {
    const { roomId, players } = JSON.parse(msg);

    for (const userId of players) {
      const socketId = await UserSocketMap.getSocketId(userId);
      if (socketId) {
        io.to(socketId).emit("MATCH_FOUND", { roomId, players });
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          socket.join(roomId);
          console.log(`Auto-joined user ${userId} into ${roomId}`);
        }
      }
    }
  }
});

httpServer.listen(3000, "0.0.0.0", () => {
  console.log("Funloop server running on port 3000");
});
