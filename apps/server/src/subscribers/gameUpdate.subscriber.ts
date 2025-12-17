import { Redis } from "ioredis";
import { logger } from "@funloop/logger";
import { prisma } from "@funloop/database";
import { RoomManager } from "../rooms/RoomManager";
import { UserService } from "../modules/users/user.service";
import { SubscriberEvent } from "@funloop/types/index";
import { Server } from "socket.io";

export function registerGameUpdateSubscriber(io: Server, sub: Redis) {
  sub.subscribe(SubscriberEvent.GAME_UPDATE);

  sub.on("message", async (channel, msg) => {
    if (channel !== SubscriberEvent.GAME_UPDATE) return;

    const { roomId, state } = JSON.parse(msg);
    const room = await RoomManager.getRoom(roomId);
    if (!room) return;
    try {
      // Broadcast to all players in the room
      io.to(roomId).emit("GAME_STATE_UPDATE", state, true);
    } catch (err) {
      logger.error("Failed to emit game update", err);
    }
  });
}
