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

/*
========================================
REGISTRO DE USUARIOS
========================================
*/
app.post("/registro", (req, res) => {

    // Extraemos datos del body
    const { nombre, correo, contraseña } = req.body;

    // Validamos campos vacíos
    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    // Verificamos si el correo ya existe
    const existeUsuario = usuarios.find(
        usuario => usuario.correo === correo
    );

    if (existeUsuario) {
        return res.status(400).json({
            mensaje: "El usuario ya existe"
        });
    }

    // Creamos nuevo usuario
    const nuevoUsuario = {
        nombre,
        correo,
        contraseña
    };

    // Guardamos usuario
    usuarios.push(nuevoUsuario);

    // Respuesta exitosa
    res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });
});

/*
========================================
LOGIN
========================================
*/
app.post("/login", (req, res) => {

    // Obtenemos datos enviados
    const { correo, contraseña } = req.body;

    // Buscamos usuario
    const usuario = usuarios.find(
        user =>
            user.correo === correo &&
            user.contraseña === contraseña
    );

    // Validamos autenticación
    if (usuario) {
        res.json({
            mensaje: "autenticación satisfactoria"
        });
    } else {
        res.status(401).json({
            mensaje: "error de autenticación"
        });
    }
}); 

// Encendemos servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});