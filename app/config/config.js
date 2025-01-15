require('dotenv').config();
const { encrypt, decrypt } = require('./encryption');

// Encrypt token when loading config
const encryptedToken = encrypt(process.env.API_TOKEN);

module.exports = {
    PORT: process.env.PORT || 3000,
    getApiToken: () => decrypt(encryptedToken), // Fonction pour décrypter le token quand nécessaire
    API_BASE_URL: process.env.API_BASE_URL,
    CACHE_TTL: process.env.CACHE_TTL || 3600
}; 