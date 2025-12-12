import { Server, Socket } from "socket.io";
import { RoomManager } from "../rooms/RoomManager";
import { redis } from "../redis";
import { logger } from "@funloop/logger";
import { TicTacToeEngine } from "@funloop/game-core";

const tttEngine = new TicTacToeEngine();

export function registerRoomEvents(io: Server, socket: Socket) {
  socket.on("JOIN_ROOM", async ({ roomId }) => {
    const userId = socket.data.userId;
    if (!userId) return socket.emit("ERROR", "Not authenticated");

    let room = await RoomManager.getRoom(roomId);
    if (!room) {
      room = await RoomManager.createRoom(roomId, userId);
    }

    socket.join(roomId);

    // Add player to room if needed
    await RoomManager.addPlayer(roomId, userId);

    // Notify other players
    io.to(roomId).emit("PLAYER_JOINED", {
      roomId,
      userId,
    });

    logger.info(`User ${userId} joined room ${roomId}`);
  });

  socket.on("DEVICE_READY", async ({ roomId }) => {
    const userId = socket.data.userId;
    if (!userId) return;

    await RoomManager.setDeviceReady(roomId, userId);

    const room = await RoomManager.getRoom(roomId);
    if (!room) return;

    if (room.ready_players.length === room.size) {
      logger.info(`All players ready in room ${roomId}`);
      io.to(roomId).emit("ALL_READY", {
        roomId,
        userId,
      });
      RoomManager.startGame(roomId);
      const initialState = tttEngine.initGame(room.players);
      // TOOD: move this to its own class;
      await redis.set(`game:${roomId}`, JSON.stringify(initialState));
      // Start room
      io.to(roomId).emit("GAME_START", {
        roomId,
        state: initialState,
      });
    }
  });

  socket.on("LEAVE_ROOM", async ({ roomId }) => {
    const userId = socket.data.userId;
    if (!userId) return;

    socket.leave(roomId);

    // remove from redis json room structure later if needed
    io.to(roomId).emit("PLAYER_LEFT", {
      roomId,
      userId,
    });

    logger.info(`User ${userId} left room ${roomId}`);
  });
}
