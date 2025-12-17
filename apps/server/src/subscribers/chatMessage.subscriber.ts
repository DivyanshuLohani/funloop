import { SubscriberEvent } from "@funloop/types/index";
import Redis from "ioredis";
import { Server } from "socket.io";

export async function registerChatMessageSubscriber(
  io: Server,
  subClient: Redis
) {
  subClient.subscribe(SubscriberEvent.CHAT_MESSAGE);

  subClient.on("message", (channel, message) => {
    if (channel === SubscriberEvent.CHAT_MESSAGE) {
      // Selectively Send only to room
      //   io.emit("chat-message", JSON.parse(message));
    }
  });
}
