const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: Tic Tac Toe game management
 */

/**
 * @swagger
 * /game:
 *   post:
 *     summary: Start a new Tic Tac Toe game
 *     tags: [Game]
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string, description: "Game ID" }
 *                 board:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items: { type: string }
 *                 nextPlayer: { type: string, enum: [X, O] }
 *                 winner: { type: string, nullable: true, enum: [X, O, null] }
 *                 status: { type: string, enum: [in_progress, won, draw] }
 */
router.post('/game', (req, res) => gameController.create(req, res));

/**
 * @swagger
 * /game/{id}:
 *   get:
 *     summary: Get current state of a game
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Current game state
 *       404:
 *         description: Game not found
 */
router.get('/game/:id', (req, res) => gameController.get(req, res));

/**
 * @swagger
 * /game/{id}/move:
 *   post:
 *     summary: Make a move in the game
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [row, col, player]
 *             properties:
 *               row:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 2
 *               col:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 2
 *               player:
 *                 type: string
 *                 enum: [X, O]
 *     responses:
 *       200:
 *         description: Move accepted, returns updated game state
 *       400:
 *         description: Invalid input or move not allowed
 *       404:
 *         description: Game not found
 */
router.post('/game/:id/move', (req, res) => gameController.move(req, res));

module.exports = router;
