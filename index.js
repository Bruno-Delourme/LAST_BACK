const debug = require("debug")("app:server");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/routers/index.js");
const { PORT } = require("./app/config/config.js");

const app = express();

// Configuration CORS mise à jour pour accepter plusieurs origines
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:5175'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/api", router);

app.use((req, res) => {
    console.log(`Route non trouvée: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

app.listen(PORT, () => {
    console.log(`server ready on http://localhost:${PORT}`);
    debug(`server ready on http://localhost:${PORT}`);
});