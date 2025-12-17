import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { redis } from "./redis";
import { UserSocketMap } from "./sockets/UserSocketMap";
import { UserStatusMap } from "./sockets/UserStatusMap";
import { registerRoomEvents } from "./sockets/roomEvents";
import { registerGameEvents } from "./sockets/gameEvents";
import { authRouter } from "./modules/auth/auth.router";
import { verifyJwt } from "./lib/jwt";
import healthRouter from "./modules/health/health.router";
import { registerMatchEvents } from "./sockets/matchEvents";
import { logger } from "@funloop/logger";
import { registerMatchFoundSubscriber } from "./subscribers/matchFound.subscriber";
import { handleReconnection } from "./sockets/reconnection";
import { registerGameEndedSubscriber } from "./subscribers/gameEnded.subscriber";
import { registerUserDisconnectSubscriber } from "./subscribers/userDisconnect.subscriber";
import { SubscriberEvent } from "@funloop/types/index";
import { registerGameUpdateSubscriber } from "./subscribers/gameUpdate.subscriber";

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
app.use("/avatars", express.static("public/avatars"));

// END OF EXPRESS CONFIGURATION //

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", async (socket) => {
  // Verify socket and get user id
  try {
    const decoded = verifyJwt(socket.handshake.auth.token);

    socket.data.userId = decoded.userId;
    socket.data.isGuest = decoded.isGuest;

    await UserSocketMap.bind(decoded.userId, socket.id);
    await UserStatusMap.bind(decoded.userId);

    logger.info(`Connected: ${socket.id}`);

    // 🔁 Reconnection check
    handleReconnection(io, socket);
    // Register socket events
    registerMatchEvents(io, socket);
    registerRoomEvents(io, socket);
    registerGameEvents(io, socket);

    socket.on("disconnect", async () => {
      await UserSocketMap.unbind(decoded.userId);
      await UserStatusMap.unbind(decoded.userId);
      pubClient.publish(SubscriberEvent.USER_DISCONNECT, decoded.userId);
      logger.info(`Disconnected: ${socket.id}`);
    });
  } catch {
    socket.emit("error", "Invalid Authentication");
    socket.disconnect(true);
  }
});

registerMatchFoundSubscriber(io, subClient);
registerGameEndedSubscriber(subClient);
registerUserDisconnectSubscriber(io, subClient);
registerGameUpdateSubscriber(io, subClient);

httpServer.listen(3000, "0.0.0.0", () => {
  logger.info("Funloop server running on port 3000");
});
