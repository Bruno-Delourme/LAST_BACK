require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    API_TOKEN: process.env.API_TOKEN,
    API_BASE_URL: process.env.API_BASE_URL,
    CACHE_TTL: process.env.CACHE_TTL || 3600
}; 