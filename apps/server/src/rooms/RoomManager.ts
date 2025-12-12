import { redis } from "../redis";

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

    const roomData = {
      id: roomId,
      gameType,
      players,
      ready_players: [],
      status: "waiting",
      startedAt: null,
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
