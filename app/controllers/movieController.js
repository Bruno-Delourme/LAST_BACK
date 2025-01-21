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

    async getMovieDetails(req, res) {
        try {
            const movieId = req.params.id;
            const movie = await movieService.getMovieWithProviders(movieId);
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTVShowDetails(req, res) {
        try {
            const tvId = req.params.id;
            const show = await movieService.getTVShowWithProviders(tvId);
            res.json(show);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMovieProviders(req, res) {
        try {
            const movieId = req.params.id;
            const providers = await movieService.getWatchProviders('movie', movieId);
            res.json(providers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTVShowProviders(req, res) {
        try {
            const tvId = req.params.id;
            const providers = await movieService.getWatchProviders('tv', tvId);
            res.json(providers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MovieController(); 