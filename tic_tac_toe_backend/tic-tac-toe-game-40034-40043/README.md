# tic-tac-toe-game-40034-40043

Backend (Express) - Tic Tac Toe API
- Runs on port 3001
- Swagger docs at /docs

Endpoints
- GET /health -> Health check
- POST /game -> Start a new game; returns { id, board, nextPlayer, winner, status }
- GET /game/:id -> Get current game state
- POST /game/:id/move -> Make a move with JSON body { row, col, player } where player is "X" or "O"

Game Rules and Validation
- 3x3 board; X starts first
- Move must be the current player's turn, within bounds [0..2], and on an empty cell
- Server validates inputs, detects wins and draws
- After a win or draw, further moves are rejected

Development
- npm run dev to start with nodemon
- npm start to run normally

Example
1. Start a game:
   curl -X POST http://localhost:3001/game
2. Make a move:
   curl -X POST http://localhost:3001/game/{id}/move -H "Content-Type: application/json" -d '{"row":0,"col":0,"player":"X"}'
3. Get state:
   curl http://localhost:3001/game/{id}
