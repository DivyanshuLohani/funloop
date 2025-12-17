import { TicTacToeEngine, TicTacToeState } from "@funloop/game-core/index";
import { redis } from "../redis";
import { logger } from "@funloop/logger";
import { SubscriberEvent } from "@funloop/types/index";

const engine = new TicTacToeEngine();

async function timerLoop() {
  logger.info("Turn timer worker running...");

  while (true) {
    const rooms = await redis.keys("game:*");

    for (const key of rooms) {
      const raw = await redis.get(key);
      if (!raw) continue;

      const game = JSON.parse(raw);

      if (Date.now() > game.turnDeadline) {
        logger.info(`Auto-playing for room ${key}`);

        const newState = engine.autoPlay(game, game.turn);

        game.state = newState;
        game.turnDeadline = Date.now() + 10000;

        await redis.set(key, JSON.stringify(game));

        await redis.publish(
          SubscriberEvent.GAME_UPDATE,
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
