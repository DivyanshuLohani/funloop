import { GameEngine } from "../GameEngine";

export interface PiecePosition {
  pos: number | null; // null = base, 0–51 board, 100+ finish lane
}

export interface LudoState {
  players: string[];
  turn: string;
  diceValue: number | null;
  pieces: Record<string, PiecePosition[]>; // { userId: [4 pieces] }
  turnDeadline: number;
  winner: string | null;
}

export interface LudoAction {
  type: "ROLL" | "MOVE";
  pieceIndex?: number;
}

/** Common safe tiles where kills don't happen */
const SAFE_TILES = [0, 8, 13, 21, 26, 34, 39, 47];

export class LudoEngine extends GameEngine<LudoState, LudoAction> {
  isGameOver(state: LudoState): boolean {
    return state.winner !== null;
  }
  initGame(players: string[]): LudoState {
    const pieces: Record<string, PiecePosition[]> = {};
    players.forEach((p) => {
      pieces[p] = [{ pos: null }, { pos: null }, { pos: null }, { pos: null }];
    });

    return {
      players,
      turn: players[0],
      diceValue: null,
      pieces,
      turnDeadline: Date.now() + 10000,
      winner: null,
    };
  }

  validateAction(state: LudoState, action: LudoAction): boolean {
    if (action.type === "ROLL") {
      return state.diceValue === null; // can only roll once per turn
    }

    if (action.type === "MOVE") {
      if (state.diceValue === null) return false;
      if (action.pieceIndex === undefined) return false;

      const piece = state.pieces[state.turn][action.pieceIndex];
      if (!piece) return false;

      // Can't move a piece in home
      if (piece.pos !== null && piece.pos >= 100) {
        return false;
      }

      // If piece is at base, must roll 6 to leave
      if (piece.pos === null && state.diceValue !== 6) {
        return false;
      }

      return true;
    }

    return false;
  }

  applyAction(state: LudoState, action: LudoAction): LudoState {
    const newState = structuredClone(state);

    if (action.type === "ROLL") {
      newState.diceValue = Math.floor(Math.random() * 6) + 1;
      // if all peices of the current player are in base then give turn to the next player
      // If dice rolls 6 and anyone of the peices of the player is still inside base then give chance to the player to  and don't change the turn yet
      const currentPlayerPieces = newState.pieces[newState.turn];
      const canMoveFromBase =
        newState.diceValue === 6 &&
        currentPlayerPieces.some((p) => p.pos === null);
      const canMoveOnBoard = currentPlayerPieces.some(
        (p) => p.pos !== null && p.pos < 100
      );

      // If the player rolled a non-6 and has no pieces on the board, or
      // if the player rolled a 6 but has no pieces in base and no pieces on the board to move,
      // then the turn should pass.
      // Otherwise, the player gets to make a move.
      if (
        (newState.diceValue !== 6 && !canMoveOnBoard) ||
        (newState.diceValue === 6 && !canMoveFromBase && !canMoveOnBoard)
      ) {
        newState.diceValue = null; // Reset dice as no move can be made
        newState.turn = this.nextPlayer(newState);
      }

      return newState;
    }

    if (action.type === "MOVE") {
      const idx = action.pieceIndex!;
      const piece = newState.pieces[newState.turn][idx];
      const roll = newState.diceValue!;

      // Leave base
      if (piece.pos === null) {
        piece.pos = this.startTile(newState.turn);
      } else {
        // Move on board
        piece.pos = this.advancePiece(piece.pos, roll);
      }

      // Handle kills
      this.handleKills(newState, newState.turn, piece.pos);

      // Check win
      if (this.checkWin(newState.turn, newState)) {
        newState.winner = newState.turn;
      }

      // Reset dice
      newState.diceValue = null;

      // Rotate turn unless roll was 6
      if (roll !== 6) {
        newState.turn = this.nextPlayer(newState);
      }

      return newState;
    }

    return newState;
  }

  /** Starting tile for each player */
  private startTile(playerId: string): number {
    // index in players array decides start tile
    return (this.hashPlayer(playerId) % 4) * 13;
  }

  /** Deterministic hash to keep start positions stable */
  private hashPlayer(id: string): number {
    let h = 0;
    for (let i = 0; i < id.length; i++) {
      h = (h * 31 + id.charCodeAt(i)) % 1000;
    }
    return h;
  }

  private advancePiece(pos: number, roll: number): number {
    const newPos = pos + roll;
    return newPos > 51 ? 100 + (newPos - 52) : newPos;
  }

  private handleKills(
    state: LudoState,
    currentPlayer: string,
    newPos: number | null
  ) {
    if (newPos === null) return;
    if (SAFE_TILES.includes(newPos)) return;

    for (const other of state.players) {
      if (other === currentPlayer) continue;

      state.pieces[other].forEach((piece) => {
        if (piece.pos === newPos) {
          piece.pos = null; // send back to base
        }
      });
    }
  }

  private checkWin(player: string, state: LudoState): boolean {
    return state.pieces[player].every((p) => p.pos !== null && p.pos >= 100);
  }

  private nextPlayer(state: LudoState): string {
    const idx = state.players.indexOf(state.turn);
    return state.players[(idx + 1) % state.players.length];
  }

  getPlayerView(state: LudoState, playerId: string) {
    // Ludo has no hidden info, return whole state
    return state;
  }

  autoPlay(state: LudoState, playerId: string): LudoState {
    const newState = structuredClone(state);

    if (newState.diceValue === null) {
      // Auto roll
      return this.applyAction(newState, { type: "ROLL" });
    }

    // Auto pick first movable piece
    const pieces = newState.pieces[playerId];
    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];

      if (piece.pos === null && newState.diceValue !== 6) continue;

      // Valid move → auto move
      return this.applyAction(newState, { type: "MOVE", pieceIndex: i });
    }

    // No valid moves → end turn
    newState.diceValue = null;
    newState.turn = this.nextPlayer(newState);
    return newState;
  }

  serializeState(state: LudoState) {
    return JSON.stringify(state);
  }

  deserializeState(raw: any): LudoState {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }
}
