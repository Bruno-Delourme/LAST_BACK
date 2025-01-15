const axios = require('axios');
const config = require('../config/config');

class MovieService {
    constructor() {
        this.api = axios.create({
            baseURL: config.API_BASE_URL,
            headers: {
                'Authorization': `Bearer ${config.getApiToken()}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async getLatestMovies() {
        try {
            const response = await this.api.get('/movie/now_playing');
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des films: ${error.message}`);
        }
    }

    async getLatestTVShows() {
        try {
            const response = await this.api.get('/tv/on_the_air');
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des séries: ${error.message}`);
        }
    }
}

module.exports = new MovieService(); 