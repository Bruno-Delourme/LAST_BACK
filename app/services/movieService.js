const axios = require('axios');

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