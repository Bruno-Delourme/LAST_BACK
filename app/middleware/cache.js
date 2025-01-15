const NodeCache = require('node-cache');

// Création d'un cache avec une durée de vie par défaut de 1 heure
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL });

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        // Renvoyer les données en cache si elles existent
        return res.json(cachedResponse);
    }

    // Modifier res.json pour mettre en cache avant d'envoyer la réponse
    const originalJson = res.json;
    res.json = function(data) {
        cache.set(key, data);
        originalJson.call(this, data);
    };

    next();
};

module.exports = { cacheMiddleware, cache }; 