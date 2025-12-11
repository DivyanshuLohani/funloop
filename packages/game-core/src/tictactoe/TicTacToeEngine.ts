import { GameEngine } from "../GameEngine";

export type Cell = "X" | "O" | null;

export interface TicTacToeState {
  board: Cell[];
  players: string[];
  turn: string; // userId whose turn it is
  winner: string | null;
  turnDeadline: number;
}

export interface TicTacToeAction {
  type: "PLACE";
  index: number; // 0–8
}

export class TicTacToeEngine extends GameEngine<
  TicTacToeState,
  TicTacToeAction
> {
  initGame(players: string[]): TicTacToeState {
    return {
      board: Array(9).fill(null),
      players,
      turn: players[0],
      winner: null,
      turnDeadline: Date.now() + 15000, // 15 sec turn timeout
    };
  }

  validateAction(state: TicTacToeState, action: TicTacToeAction): boolean {
    if (action.type !== "PLACE") return false;
    if (state.winner) return false;

    const idx = action.index;
    if (idx < 0 || idx > 8) return false;

    return state.board[idx] === null;
  }

  applyAction(state: TicTacToeState, action: TicTacToeAction): TicTacToeState {
    const newState = structuredClone(state);

    if (newState.winner) return newState;

    const idx = action.index;
    const playerIndex = newState.players.indexOf(newState.turn);
    const mark: Cell = playerIndex === 0 ? "X" : "O";

    newState.board[idx] = mark;

    // Check win condition
    const w = this.checkWinner(newState.board);
    if (w !== null) {
      newState.winner = newState.turn;
      return newState;
    }

    // Check draw
    if (newState.board.every((c) => c !== null)) {
      newState.winner = "draw";
      return newState;
    }

    // Next turn
    newState.turn = this.nextPlayer(newState);
    newState.turnDeadline = Date.now() + 15000;

    return newState;
  }

  isGameOver(state: TicTacToeState): boolean {
    return state.winner !== null;
  }

  getPlayerView(state: TicTacToeState, playerId: string) {
    return state; // everything visible to all
  }

  autoPlay(state: TicTacToeState, playerId: string): TicTacToeState {
    const newState = structuredClone(state);

    // pick any empty spot
    const emptyIdx = newState.board.findIndex((c) => c === null);

    if (emptyIdx !== -1) {
      return this.applyAction(newState, {
        type: "PLACE",
        index: emptyIdx,
      });
    }

    return newState;
  }

  private nextPlayer(state: TicTacToeState): string {
    const idx = state.players.indexOf(state.turn);
    return state.players[(idx + 1) % state.players.length];
  }

  private checkWinner(board: Cell[]): string | null {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  }
}
