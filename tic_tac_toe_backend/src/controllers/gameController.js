const gameService = require('../services/gameService');

class GameController {
  // PUBLIC_INTERFACE
  /**
   * POST /game
   * Create a new game and return its state.
   */
  create(req, res) {
    try {
      const state = gameService.createGame();
      return res.status(201).json(state);
    } catch (e) {
      // Unexpected error
      return res.status(500).json({ message: 'Failed to create game' });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * GET /game/:id
   * Fetch a game's current state.
   */
  get(req, res) {
    const { id } = req.params;
    const game = gameService.getGame(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    return res.status(200).json(game);
    }

  // PUBLIC_INTERFACE
  /**
   * POST /game/:id/move
   * Make a move with payload { row, col, player }
   */
  move(req, res) {
    const { id } = req.params;
    const { row, col, player } = req.body || {};
    const result = gameService.makeMove(id, { row, col, player });
    if (result.error) {
      return res.status(result.code || 400).json({ message: result.error });
    }
    return res.status(200).json(result.state);
  }
}

module.exports = new GameController();
