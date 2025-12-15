import { Server } from "socket.io";
import { Redis } from "ioredis";
import { UserSocketMap } from "../sockets/UserSocketMap";
import { logger } from "@funloop/logger";
import { UserService } from "../modules/users/user.service";
import { SubscriberEvent } from "@funloop/types/index";

export function registerMatchFoundSubscriber(io: Server, subClient: Redis) {
  subClient.subscribe(SubscriberEvent.MATCH_FOUND);

  subClient.on("message", async (channel, msg) => {
    if (channel === SubscriberEvent.MATCH_FOUND) {
      const { roomId, players } = JSON.parse(msg);

      for (const userId of players) {
        const socketId = await UserSocketMap.getSocketId(userId);
        if (socketId) {
          const playerMap = await UserService.getUserSnapshotMany(players);
          io.to(socketId).emit("MATCH_FOUND", { roomId, players, playerMap });
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            socket.join(roomId);
            logger.info(`Auto-joined user ${userId} into ${roomId}`);
          }
        }
      }
    }
  });
}
