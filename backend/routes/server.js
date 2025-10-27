const express = require("express");
const authRoutes = require("./auth.routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Aquí agregamos tu dominio de GitHub Pages
const ALLOWED_ORIGINS = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://DelgadoLia.github.io', // Agregamos el dominio base
    'https://DelgadoLia.github.io/egadfront', // Opcional pero recomendado
    'https://delgadolia.github.io/egadfrontNode3'
];

// Middleware para JSON
app.use(express.json());

app.use(cors({
    origin: function(origin, callback) {
        // permite requests sin origin (por ejemplo, Postman)
        if (!origin) return callback(null, true);

        if (ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        } else {
            console.warn("CORS bloqueado para:", origin);
            return callback(new Error('CORS no permitido'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200
}));

// Rutas
app.use("/api", authRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

