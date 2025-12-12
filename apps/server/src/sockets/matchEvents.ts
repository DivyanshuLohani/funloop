import { Server, Socket } from "socket.io";
import { MatchmakingQueue } from "../matchmaking/Queue";

export function registerMatchEvents(io: Server, socket: Socket) {
  socket.on("QUEUE_JOIN", async ({ gameType }) => {
    const userId = socket.data.userId;
    if (!userId) return;

    await MatchmakingQueue.joinQueue(gameType, 2, userId);
  });
}
