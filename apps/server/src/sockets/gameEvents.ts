import { Server, Socket } from "socket.io";
import { redis } from "../redis";
import { TicTacToeEngine } from "@funloop/game-core";

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
}
