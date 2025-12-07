import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { redis } from "./redis";
import { UserSocketMap } from "./sockets/UserSocketMap";
import { registerRoomEvents } from "./sockets/roomEvents";
import { registerGameEvents } from "./sockets/gameEvents";

const pubClient = redis;
const subClient = redis.duplicate();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // TEMP: userId = socket.id (until authentication is added)
  const userId = "user-" + socket.id;
  socket.data.userId = userId;

  UserSocketMap.bind(userId, socket.id);

  // Register socket events
  registerRoomEvents(io, socket);
  registerGameEvents(io, socket);

  socket.on("disconnect", () => {
    UserSocketMap.unbind(userId);
    console.log("Disconnected:", socket.id);
  });
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

app.get("/", (req, res) => {
  res.send("Funloop Server Running");
});

httpServer.listen(3000, () => {
  console.log("Funloop server running on port 3000");
});
