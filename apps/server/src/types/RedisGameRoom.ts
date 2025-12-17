import { GameType } from "@funloop/types/index";

export enum RoomVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum RoomType {
  GAME = "game",
  PARTY = "party",
  DM = "dm",
}

export interface RedisGameRoom {
  id: string;
  type: RoomType;
  visibility: RoomVisibility;
  host: string;
  gameType: GameType;
  size: number;
  players: string[];
  ready_players: string[];
  status: string;
  rematch_requests: string[]; // userIds who clicked rematch
  startedAt: number | null;
  game_state: any;
  createdAt: number;
}
