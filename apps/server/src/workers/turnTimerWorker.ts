import { redis } from "../redis";
import { LudoEngine, LudoState } from "@funloop/game-core/ludo/LudoEngine";

const engine = new LudoEngine();

async function timerLoop() {
  console.log("Turn timer worker running...");

  while (true) {
    const rooms = await redis.keys("game:*");

    for (const key of rooms) {
      const raw = await redis.get(key);
      if (!raw) continue;

      const game = JSON.parse(raw) as {
        state: LudoState;
        turn: string;
        turnDeadline: number;
      };

      if (Date.now() > game.turnDeadline) {
        console.log(`Auto-playing for room ${key}`);

        const newState = engine.autoPlay(game.state, game.turn);

        game.state = newState;
        game.turnDeadline = Date.now() + 10000;

        await redis.set(key, JSON.stringify(game));

        await redis.publish(
          "game-update",
          JSON.stringify({
            roomId: key.replace("game:", ""),
            state: engine.getPlayerView(newState, game.turn),
          })
        );
      }
    }

    await wait(1000);
  }
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

timerLoop();
