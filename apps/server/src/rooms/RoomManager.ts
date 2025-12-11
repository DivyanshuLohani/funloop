import { redis } from "../redis";
import { v4 as uuid } from "uuid";

export class RoomManager {
  static async createRoom(gameType: string, players: string[]) {
    const roomId = `room:${uuid()}`;

    const roomData = {
      id: roomId,
      gameType,
      players,
      createdAt: Date.now(),
    };

    await redis.set(roomId, JSON.stringify(roomData));
    return roomId;
  }

  static async getRoom(roomId: string) {
    const raw = await redis.get(roomId);
    return raw ? JSON.parse(raw) : null;
  }

  static async addPlayer(roomId: string, userId: string) {
    const room = await this.getRoom(roomId);
    if (!room) return null;

    if (!room.players.includes(userId)) {
      room.players.push(userId);
      await redis.set(roomId, JSON.stringify(room));
    }

    return room;
  }
}
