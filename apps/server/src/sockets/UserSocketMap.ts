import { redis } from "../redis";

export class UserSocketMap {
  static async bind(userId: string, socketId: string) {
    await redis.hset("user:sockets", userId, socketId);
  }

  static async unbind(userId: string) {
    await redis.hdel("user:sockets", userId);
  }

  static async getSocketId(userId: string) {
    return await redis.hget("user:sockets", userId);
  }
}
