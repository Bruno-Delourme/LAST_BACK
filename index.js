const debug = require("debug")("app:server");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/routers/index.js");
const { PORT } = require("./app/config/config.js");

const app = express();

app.use(cors());

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