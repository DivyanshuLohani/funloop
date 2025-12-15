import { Server } from "socket.io";
import Redis from "ioredis";
import { GameType } from "@funloop/types";
import { MatchmakingQueue } from "../matchmaking/Queue";
import { SubscriberEvent } from "@funloop/types/index";

export function registerUserDisconnectSubscriber(io: Server, subClient: Redis) {
  subClient.subscribe(SubscriberEvent.USER_DISCONNECT);

  subClient.on("message", (channel, message) => {
    if (channel !== SubscriberEvent.USER_DISCONNECT) return;
    if (!message || typeof message !== "string") return;
    const userId = message;

    for (const gameType of Object.values(GameType)) {
      MatchmakingQueue.leaveQueue(gameType, userId);
    }
  });
}
