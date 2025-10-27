const express = require("express");
const authRoutes = require("./auth.routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// CORS simplificado - ESTA ES LA QUE RECOMIENDO
app.use(cors({
    origin: 'https://delgadolia.github.io',
    credentials: true
}));

// Rutas
app.use("/api", authRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log('CORS configurado para: https://delgadolia.github.io');
});