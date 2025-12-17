import { redis } from "../redis";

export class UserStatusMap {
  static async bind(userId: string) {
    await redis.hset("user:status", userId, "online");
  }

  static async unbind(userId: string) {
    await redis.hdel("user:status", userId);
  }

  static async getOnlineUsers() {
    return await redis.hgetall("user:status");
  }
}
