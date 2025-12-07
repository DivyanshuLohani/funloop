export abstract class GameEngine<State = any, Action = any, View = any> {
  /** Initialize a new game */
  abstract initGame(players: string[]): State;

  /** Validate a player's action before applying it */
  abstract validateAction(state: State, action: Action): boolean;

  /** Apply action and return updated state */
  abstract applyAction(state: State, action: Action): State;

  /** Check if the game is finished */
  abstract isGameOver(state: State): boolean;

  /** Convert internal state to what one player should see */
  abstract getPlayerView(state: State, playerId: string): View;

  /** Auto-play logic for when a player times out */
  abstract autoPlay(state: State, playerId: string): State;

  /** Optional lifecycle hook when turn changes */
  onTurnStart?(state: State): State | void;

  /** Serialize state for Redis */
  serializeState?(state: State): any;

  /** Deserialize state when loading from Redis */
  deserializeState?(data: any): State;
}
