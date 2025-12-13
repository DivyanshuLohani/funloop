import { Server, Socket } from "socket.io";
import { redis } from "../redis";
import { TicTacToeEngine } from "@funloop/game-core";
import { RoomManager } from "../rooms/RoomManager";
import logger from "packages/logger/dist";

const engine = new TicTacToeEngine();

export function registerGameEvents(io: Server, socket: Socket) {
  socket.on("PLAYER_ACTION", async ({ roomId, index }) => {
    const userId = socket.data.userId;

    // Load current game state
    const raw = await redis.get(`game:${roomId}`);
    if (!raw) return;

    let state = JSON.parse(raw);

    // TURN VALIDATION
    if (state.turn !== userId) {
      return socket.emit("ERROR", "Not your turn");
    }

    // Build action object
    const action = { type: "PLACE", index } as any;

    // Validate action
    if (!engine.validateAction(state, action)) {
      return socket.emit("ERROR", "Invalid Move");
    }

    // Apply engine logic
    const newState = engine.applyAction(state, action);

    // Save updated game state
    await redis.set(`game:${roomId}`, JSON.stringify(newState));

    // Broadcast to all players in the room
    io.to(roomId).emit("GAME_STATE_UPDATE", newState);
  });
  socket.on("REQUEST_REMATCH", async ({ roomId }) => {
    logger.info(`REQUEST_REMATCH: ${roomId}`);
    const userId = socket.data.userId;
    if (!userId) return;

    const room = await RoomManager.getRoom(roomId);
    if (!room) return;

    // initialize if missing
    room.rematch_requests ||= [];

    if (!room.rematch_requests.includes(userId)) {
      room.rematch_requests.push(userId);
    }

    await RoomManager.setRoom(roomId, room);

    io.to(roomId).emit("REMATCH_STATUS", {
      accepted: room.rematch_requests,
      total: room.players.length,
    });

    // If all players accepted
    if (room.rematch_requests.length === room.players.length) {
      room.rematch_requests = [];
      await RoomManager.setRoom(roomId, room);

      const engine = new TicTacToeEngine();
      const newState = engine.initGame(room.players);

      await redis.set(`game:${roomId}`, JSON.stringify(newState));

      io.to(roomId).emit("REMATCH_START", {
        roomId,
        state: newState,
      });
    }
  });
}
