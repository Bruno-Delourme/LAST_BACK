const axios = require('axios');
const config = require('../config/config');

class MovieService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    }

    formatImageUrl(path, size = 'w500') {
        if (!path) return null;
        return `${config.IMAGE_BASE_URL}${size}${path}`;
    }

    async getLatestMovies() {
        try {
            const response = await this.api.get('/movie/now_playing');
            const movies = response.data.results.map(movie => ({
                ...movie,
                poster_url: this.formatImageUrl(movie.poster_path),
                backdrop_url: this.formatImageUrl(movie.backdrop_path, 'w780'),
                poster_urls: {
                    small: this.formatImageUrl(movie.poster_path, 'w185'),
                    medium: this.formatImageUrl(movie.poster_path, 'w342'),
                    large: this.formatImageUrl(movie.poster_path, 'w500'),
                    original: this.formatImageUrl(movie.poster_path, 'original')
                }
            }));
            return { ...response.data, results: movies };
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des films: ${error.message}`);
        }
    }

    async getLatestTVShows() {
        try {
            const response = await this.api.get('/tv/on_the_air');
            const shows = response.data.results.map(show => ({
                ...show,
                poster_url: this.formatImageUrl(show.poster_path),
                backdrop_url: this.formatImageUrl(show.backdrop_path, 'w780'),
                poster_urls: {
                    small: this.formatImageUrl(show.poster_path, 'w185'),
                    medium: this.formatImageUrl(show.poster_path, 'w342'),
                    large: this.formatImageUrl(show.poster_path, 'w500'),
                    original: this.formatImageUrl(show.poster_path, 'original')
                }
            }));
            return { ...response.data, results: shows };
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des séries: ${error.message}`);
        }
    }

    async getWatchProviders(type, id) {
        try {
            const response = await this.api.get(`/${type}/${id}/watch/providers`);
            // On récupère les providers pour la France (FR)
            const providers = response.data.results.FR || {};
            return {
                flatrate: providers.flatrate || [], // Streaming
                rent: providers.rent || [],     // Location
                buy: providers.buy || [],       // Achat
                link: providers.link || null    // Lien TMDB pour plus de détails
            };
        } catch (error) {
            console.error('Error fetching watch providers:', error);
            throw new Error(`Erreur lors de la récupération des plateformes: ${error.message}`);
        }
    }

    async getMovieWithProviders(movieId) {
        try {
            const [movieDetails, providers] = await Promise.all([
                this.api.get(`/movie/${movieId}`),
                this.getWatchProviders('movie', movieId)
            ]);

            return {
                ...movieDetails.data,
                poster_url: this.formatImageUrl(movieDetails.data.poster_path),
                backdrop_url: this.formatImageUrl(movieDetails.data.backdrop_path, 'w780'),
                watch_providers: providers
            };
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du film: ${error.message}`);
        }
    }

    async getTVShowWithProviders(tvId) {
        try {
            const [showDetails, providers] = await Promise.all([
                this.api.get(`/tv/${tvId}`),
                this.getWatchProviders('tv', tvId)
            ]);

            return {
                ...showDetails.data,
                poster_url: this.formatImageUrl(showDetails.data.poster_path),
                backdrop_url: this.formatImageUrl(showDetails.data.backdrop_path, 'w780'),
                watch_providers: providers
            };
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la série: ${error.message}`);
        }
    }
}

module.exports = new MovieService(); 