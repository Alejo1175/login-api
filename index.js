// Importamos express
const express = require("express");

// Creamos la aplicación
const app = express();

// Conectamos el puerto del servidor
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Codigo para la base de datos temporal en memoria
let usuarios = [];
