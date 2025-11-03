const { v4: uuidv4 } = require('uuid');

/**
 * In-memory store for Tic Tac Toe games.
 * Each game:
 * {
 *  id: string,
 *  board: string[][], // 3x3, values 'X' | 'O' | ''
 *  nextPlayer: 'X' | 'O',
 *  winner: 'X' | 'O' | null,
 *  status: 'in_progress' | 'won' | 'draw',
 *  moves: number
 * }
 */
class GameService {
  constructor() {
    this.games = new Map();
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new game with an empty 3x3 board and X to start.
   * @returns {{id:string, board:string[][], nextPlayer:string, winner:null, status:string}}
   */
  createGame() {
    const id = uuidv4();
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    const game = {
      id,
      board,
      nextPlayer: 'X',
      winner: null,
      status: 'in_progress',
      moves: 0,
    };
    this.games.set(id, game);
    return this._publicState(game);
  }

  // PUBLIC_INTERFACE
  /**
   * Get current state of a game by id.
   * @param {string} id
   * @returns {{id:string, board:string[][], nextPlayer:string, winner:string|null, status:string}|null}
   */
  getGame(id) {
    const game = this.games.get(id);
    if (!game) return null;
    return this._publicState(game);
  }

  // PUBLIC_INTERFACE
  /**
   * Make a move on a game after validating inputs and state.
   * @param {string} id
   * @param {{row:number, col:number, player:'X'|'O'}} payload
   * @returns {{state:object}|{error:string, code:number}}
   */
  makeMove(id, payload) {
    const game = this.games.get(id);
    if (!game) {
      return { error: 'Game not found', code: 404 };
    }
    if (game.status !== 'in_progress') {
      return { error: `Game is ${game.status}`, code: 400 };
    }

    const { row, col, player } = payload || {};
    // Input validation
    if (!Number.isInteger(row) || !Number.isInteger(col)) {
      return { error: 'row and col must be integers', code: 400 };
    }
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return { error: 'row and col must be between 0 and 2', code: 400 };
    }
    if (player !== 'X' && player !== 'O') {
      return { error: 'player must be X or O', code: 400 };
    }
    if (player !== game.nextPlayer) {
      return { error: `It is not player ${player}'s turn`, code: 400 };
    }
    if (game.board[row][col] !== '') {
      return { error: 'Cell already occupied', code: 400 };
    }

    // Apply move
    game.board[row][col] = player;
    game.moves += 1;

    // Check game result
    const winner = this._checkWinner(game.board);
    if (winner) {
      game.winner = winner;
      game.status = 'won';
      return { state: this._publicState(game) };
    }
    if (game.moves === 9) {
      game.status = 'draw';
      return { state: this._publicState(game) };
    }

    // Switch turn
    game.nextPlayer = player === 'X' ? 'O' : 'X';
    return { state: this._publicState(game) };
  }

  /**
   * Compute winner on a 3x3 board.
   * @param {string[][]} b
   * @returns {'X'|'O'|null}
   */
  _checkWinner(b) {
    const lines = [
      // rows
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      // cols
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      // diagonals
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]],
    ];
    for (const [a, c, d] of lines) {
      if (a && a === c && a === d) return a;
    }
    return null;
  }

  /**
   * Return public state (omit internal counters)
   */
  _publicState(game) {
    return {
      id: game.id,
      board: game.board,
      nextPlayer: game.nextPlayer,
      winner: game.winner,
      status: game.status,
    };
    // moves is intentionally omitted
  }
}

module.exports = new GameService();
