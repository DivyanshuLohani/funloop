import { Server, Socket } from "socket.io";
import { redis } from "../redis";
import { RoomManager } from "../rooms/RoomManager";
import { prisma } from "@funloop/database";
import { UserService } from "../modules/users/user.service";
import { logger } from "@funloop/logger";

export async function handleReconnection(io: Server, socket: Socket) {
  socket.on("CHECK_GAME_STATUS", async () => {
    logger.info(`Checking game status for user ${socket.data.userId}`);
    const userId = socket.data.userId;
    if (!userId) return;

    const roomId = await redis.get(`user:${userId}:activeRoom`);
    if (!roomId) return;

    const room = await RoomManager.getRoom(roomId);
    if (!room) return;

    // Fetch current game state
    const rawState = await redis.get(`game:${roomId}`);
    if (!rawState) return;

    const gameState = JSON.parse(rawState);

    // Fetch player display data
    const playersMap = await UserService.getUserSnapshotMany(room.players);

    // Tell client it was already in a game
    socket.emit("ALREADY_IN_GAME", {
      roomId,
      state: gameState,
      playersMap,
    });
  });
}
