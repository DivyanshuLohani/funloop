import { GameType } from "@funloop/types/index";
import { redis } from "../redis";
import { logger } from "@funloop/logger";

export class MatchmakingQueue {
  static queueKey(gameType: GameType, size: number) {
    return `queue:${gameType}:${size}`;
  }

  static getPlayersInQueue(gameType: GameType, size: number) {
    return redis.lrange(this.queueKey(gameType, size), 0, -1);
  }

  static getEmptyQueues(gameType: GameType, size: number) {
    return redis.lrange(this.queueKey(gameType, size), 0, -1);
  }

  static async joinQueue(gameType: GameType, size: number, userId: string) {
    logger.info(`Joining queue ${gameType} ${size} ${userId}`);
    const queue = await this.getPlayersInQueue(gameType, size);
    if (queue.includes(userId)) {
      logger.info(`Player ${userId} is already in the queue`);
      return;
    }
    logger.info(`Player ${userId} joined queue ${gameType} ${size}`);
    await redis.lpush(this.queueKey(gameType, size), userId);
  }

  static async leaveQueue(gameType: GameType, userId: string) {
    await redis.lrem(this.queueKey(gameType, 2), 1, userId);
    logger.info(`Player ${userId} left queue ${gameType}`);
  }

  static async popPlayers(gameType: GameType, size: number) {
    const key = this.queueKey(gameType, size);
    return await redis.rpop(key, size);
  }

  static async queueLength(gameType: GameType, size: number) {
    return await redis.llen(this.queueKey(gameType, size));
  }
}
