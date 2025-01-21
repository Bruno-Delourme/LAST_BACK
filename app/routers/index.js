const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { cacheMiddleware } = require('../middleware/cache');

// Route de test
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Routes pour les films et séries avec middleware de cache
router.get('/movies/latest', cacheMiddleware, movieController.getLatestMovies);
router.get('/tv/latest', cacheMiddleware, movieController.getLatestTVShows);

// Routes pour les détails avec providers
router.get('/movies/:id', cacheMiddleware, movieController.getMovieDetails);
router.get('/tv/:id', cacheMiddleware, movieController.getTVShowDetails);
router.get('/movies/:id/providers', cacheMiddleware, movieController.getMovieProviders);
router.get('/tv/:id/providers', cacheMiddleware, movieController.getTVShowProviders);

module.exports = router; 