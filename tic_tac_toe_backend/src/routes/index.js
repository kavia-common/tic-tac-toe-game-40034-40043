const express = require('express');
const healthController = require('../controllers/health');
const gameRoutes = require('./game');

const router = express.Router();

// Health endpoint for root
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 */
router.get('/health', healthController.check.bind(healthController));

// Mount game routes
router.use('/', gameRoutes);

module.exports = router;
