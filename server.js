// cargar variables de entorno
require('dotenv').config();

// importar dependencias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// crear app de express
const app = express()

// cors
// const corsOptions = {
//     origin: 'http://localhost:3000', // Solo permitimos este origen
//     methods: ("GET", "POST", "PUT", "DELETE"), // Métodos permitidos
//     allowedHeaders: ["Content-Type", "Authorization"] // Encabezados permitidos
// };
app.use(cors())

// middleware para leer JSON cuando hagamos una petición a la base de datos
app.use(express.json())

// conexión a MondoDB con Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a la BBDD'))
    .catch(err => console.error('( Error al conectar a la BBDD:', err))

// Rutas de User
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes) // definimos el endpoint de nuestra api hacia este modelo en concreto

// Rutas de Auth
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// Manejo de rutas no encontradas
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }))

// Middleware de errores
 const errorGES = require('./middlewares/errorGES')
// app.use(errorGES)

// arrancar el servidor
    const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {console.log(`Servidor escuchando en puerto ${PORT}`);
});