export interface RedisGameRoom {
  id: string;
  gameType: string;
  size: number;
  players: string[];
  ready_players: string[];
  status: string;
  rematch_requests: string[]; // userIds who clicked rematch
  startedAt: number | null;
  game_state: any;
  createdAt: number;
}
