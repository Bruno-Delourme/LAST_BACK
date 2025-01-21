require('dotenv').config();
const { encrypt, decrypt } = require('./encryption');

// Encrypt token when loading config
const encryptedToken = encrypt(process.env.API_TOKEN);

module.exports = {
    PORT: process.env.PORT || 3000,
    getApiToken: () => decrypt(encryptedToken), // Fonction pour décrypter le token quand nécessaire
    API_BASE_URL: process.env.API_BASE_URL,
    CACHE_TTL: process.env.CACHE_TTL || 3600,
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    IMAGE_SIZES: {
        poster: {
            small: 'w185',
            medium: 'w342',
            large: 'w500',
            original: 'original'
        },
        backdrop: {
            small: 'w300',
            medium: 'w780',
            large: 'w1280',
            original: 'original'
        }
    }
}; 