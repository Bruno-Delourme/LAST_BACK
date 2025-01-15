const movieService = require('../services/movieService');

class MovieController {
    async getLatestMovies(req, res) {
        try {
            const movies = await movieService.getLatestMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLatestTVShows(req, res) {
        try {
            const shows = await movieService.getLatestTVShows();
            res.json(shows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MovieController(); 