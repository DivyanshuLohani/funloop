import { Redis } from "ioredis";
import { logger } from "@funloop/logger";
import { prisma } from "@funloop/database";
import { RoomManager } from "../rooms/RoomManager";

export function registerGameEndedSubscriber(sub: Redis) {
  sub.subscribe("game-ended");

  sub.on("message", async (channel, msg) => {
    if (channel !== "game-ended") return;

    const { roomId } = JSON.parse(msg);
    const room = await RoomManager.getRoom(roomId);
    if (!room) return;

    const { gameType, players } = room;
    const winnerId = room.game_state?.winner; // This will be present because the game is over

    try {
      // Record game result
      const result = await prisma.gameResult.create({
        data: {
          roomId,
          gameType,
          winnerId,
          startedAt: new Date(),
          endedAt: new Date(),
          players,
        },
      });

      // Update stats per player
      for (const playerId of players) {
        await prisma.matchHistory.create({
          data: {
            userId: playerId,
            gameType,
            resultId: result.id,
          },
        });
      }

      logger.info(`Stats recorded for room ${roomId}`);
    } catch (err) {
      logger.error("Failed to record game stats", err);
    }
  });
}
