import { redis } from "../redis";

export class MatchmakingQueue {
  static queueKey(gameType: string, size: number) {
    return `queue:${gameType}:${size}`;
  }

  static async joinQueue(gameType: string, size: number, userId: string) {
    await redis.lpush(this.queueKey(gameType, size), userId);
  }

  static async popPlayers(gameType: string, size: number) {
    const key = this.queueKey(gameType, size);
    return await redis.rpop(key, size);
  }

  static async queueLength(gameType: string, size: number) {
    return await redis.llen(this.queueKey(gameType, size));
  }
}
