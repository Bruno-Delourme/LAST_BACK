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
            const providers = await movieService.getProviders('movie', movieId);
            
            if (!providers.has_providers) {
                return res.json({
                    message: "Pas encore de plateforme disponible en France",
                    providers: []
                });
            }
            
            res.json(providers);
        } catch (error) {
            console.error('Error in getMovieProviders:', error);
            res.status(500).json({ 
                error: 'Erreur lors de la récupération des plateformes',
                details: error.message 
            });
        }
    }

    async getTVProviders(req, res) {
        try {
            const tvId = req.params.id;
            const providers = await movieService.getProviders('tv', tvId);
            
            if (!providers.has_providers) {
                return res.json({
                    message: "Pas encore de plateforme disponible en France",
                    providers: []
                });
            }
            
            res.json(providers);
        } catch (error) {
            console.error('Error in getTVProviders:', error);
            res.status(500).json({ 
                error: 'Erreur lors de la récupération des plateformes',
                details: error.message 
            });
        }
    }
}

module.exports = new MovieController(); 