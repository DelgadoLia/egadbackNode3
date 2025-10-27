const express = require("express");
const authRoutes = require("./auth.routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Dominios permitidos
const ALLOWED_ORIGINS = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://DelgadoLia.github.io',
    'https://DelgadoLia.github.io/egadfront',
    'https://delgadolia.github.io/egadfrontNode3',
    'https://delgadolia.github.io/egadfrontNode3/'
];

// Middleware para JSON
app.use(express.json());

// Configurar CORS globalmente
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // Postman o requests sin origin
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        return callback(new Error('CORS no permitido'));
    },
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
app.use("/api", authRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
