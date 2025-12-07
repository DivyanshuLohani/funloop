import { LudoState } from "@funloop/game-core";

export interface RedisGameRoom {
  roomId: string;
  gameType: string;
  players: string[];
  state: LudoState;
  turn: string;
  turnDeadline: number;
  createdAt: number;
}
