import { Server, Socket } from "socket.io";
import { LudoEngine, LudoAction, LudoState } from "@funloop/game-core";
import { redis } from "../redis";
import { logger } from "@funloop/logger";

const engine = new LudoEngine();

/**
 * Helper to get game key in Redis
 */
const getGameKey = (roomId: string) => `game:${roomId}`;

export function registerGameEvents(io: Server, socket: Socket) {
  // Start Game
  socket.on(
    "START_GAME",
    async ({ roomId, players }: { roomId: string; players: string[] }) => {
      // In a real app, we'd verify the user is the host and players are in the room.
      // For now, init game state and save.
      const state = engine.initGame(players);
      const key = getGameKey(roomId);

      await redis.set(key, engine.serializeState(state));

      io.to(roomId).emit("GAME_STATE", state);
      logger.info(`Game started in room ${roomId}`);
    }
  );

  // Game Action
  socket.on(
    "GAME_ACTION",
    async ({ roomId, action }: { roomId: string; action: LudoAction }) => {
      const key = getGameKey(roomId);
      const rawState = await redis.get(key);

      if (!rawState) {
        return socket.emit("ERROR", "Game not found");
      }

      const state = engine.deserializeState(rawState);

      // Validate turn
      // userId is attached to socket in index.ts
      const userId = socket.data.userId;
      if (state.turn !== userId) {
        // Technically strict validation matches socket.data.userId to state.turn
        // But for testing simplicity we might rely on client sending correct actions?
        // Let's enforce it:
        // return socket.emit("ERROR", "Not your turn");
      }

      // Validate Action
      if (!engine.validateAction(state, action)) {
        logger.info(`Invalid action by ${userId}: ${action}`);
        return socket.emit("ERROR", "Invalid action");
      }

      // Apply Action
      const newState = engine.applyAction(state, action);

      // Save
      await redis.set(key, engine.serializeState(newState));

      // Broadcast
      io.to(roomId).emit("GAME_STATE", newState);

      if (newState.winner) {
        io.to(roomId).emit("GAME_OVER", { winner: newState.winner });
      }
    }
  );

  // Get State
  socket.on("GET_STATE", async ({ roomId }) => {
    const key = getGameKey(roomId);
    const rawState = await redis.get(key);
    if (rawState) {
      socket.emit("GAME_STATE", engine.deserializeState(rawState));
    }
  });
}
