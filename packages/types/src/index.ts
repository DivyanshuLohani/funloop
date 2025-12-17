export * from "./players";

export enum GameType {
  TICTACTOE = "tictactoe",
  LUDO = "ludo",
}

export enum SubscriberEvent {
  USER_DISCONNECT = "user-disconnect",
  MATCH_FOUND = "match-found",
  GAME_ENDED = "game-ended",
  CHAT_MESSAGE = "chat-message",
  GAME_UPDATE = "game-update",
}
