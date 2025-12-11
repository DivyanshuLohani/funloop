import { MatchmakingQueue } from "../matchmaking/Queue";
import { RoomManager } from "../rooms/RoomManager";
import { redis } from "../redis";

async function matchmakingLoop() {
  console.log("Matchmaking worker running...");

  while (true) {
    const gameType = "tictactoe";
    const size = 2; // 2-player ludo for now

    const length = await MatchmakingQueue.queueLength(gameType, size);
    console.log("Matchmaking queue length:", length);

    if (length >= size) {
      const players = await MatchmakingQueue.popPlayers(gameType, size);
      const roomId = await RoomManager.createRoom(gameType, players ?? []);

      // publish to websocket servers
      await redis.publish("match-found", JSON.stringify({ roomId, players }));
    }

    await wait(200); // 200 ms tick
  }
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

matchmakingLoop();
