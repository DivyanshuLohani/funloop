import { redis } from "../redis";
import { RedisGameRoom } from "../types/RedisGameRoom";

const generateRoomCode = () => {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export class RoomManager {
  static async createRoom(gameType: string, players: string[]) {
    const roomId = `room:${generateRoomCode()}`;

    const roomData: RedisGameRoom = {
      id: roomId,
      gameType,
      size: 2,
      players,
      ready_players: [],
      status: "waiting",
      rematch_requests: [],
      startedAt: null,
      game_state: null,
      createdAt: Date.now(),
    };

    await redis.set(roomId, JSON.stringify(roomData));
    return roomId;
  }

  static async setDeviceReady(roomId: string, userId: string) {
    const room = await this.getRoom(roomId);
    if (!room) return;

    room.ready_players.push(userId);
    await this.setRoom(roomId, room);

    if (room.ready_players.length === room.size) {
      room.status = "started";
      await this.setRoom(roomId, room);
      this.startGame(roomId);
    }
  }

  static async startGame(roomId: string) {
    const room = await this.getRoom(roomId);
    if (!room) return;
    room.status = "started";
    for (const playerId of room.players) {
      await redis.set(`user:${playerId}:activeRoom`, roomId);
    }

    await this.setRoom(roomId, room);
  }

  static async setRoom(roomId: string, newState: RedisGameRoom) {
    await redis.set(roomId, JSON.stringify(newState));
  }

  static async getRoom(roomId: string): Promise<RedisGameRoom | null> {
    const raw = await redis.get(roomId);
    return raw ? JSON.parse(raw) : null;
  }

  static async addPlayer(
    roomId: string,
    userId: string
  ): Promise<RedisGameRoom | null> {
    const room = await this.getRoom(roomId);
    if (!room) return null;

    if (!room.players.includes(userId)) {
      room.players.push(userId);
      await this.setRoom(roomId, room);
    }

    return room;
  }
  static async removePlayer(roomId: string, userId: string) {
    const room = await this.getRoom(roomId);
    if (!room) return;
    room.players = room.players.filter((id) => id !== userId);
    await redis.del(`user:${userId}:activeRoom`);
    await this.setRoom(roomId, room);
  }
}
