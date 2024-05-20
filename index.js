// Importaciones
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "Shhhh";
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors')

const { nuevoUsuario, getUsuario } = require("./consultas");

// Server
console.log(process.env.PORT)
app.use(cors())
app.listen(process.env.PORT, () => console.log("Servidor encendido!"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { email, nombre, password } = req.body;
  try {
    if (
      email === undefined ||
      email.trim() === "" ||
      nombre === undefined ||
      nombre.trim() === "" ||
      password === undefined ||
      password.trim() === ""
    ) {
      throw new Error("Debes colocar todos los campos");
    }
    const usuario = await nuevoUsuario(email, nombre, password);
    res.status(201).send("Usuario Creado con exito");
  } catch (error) {
    res.status(400).send(`Error al crear al usuario: ${error.message}`);
  }
});

app.post("/sign_in", async function (req, res) {
  let { email, password } = req.body;
  let user = await getUsuario(email, password);
  if (user) {
    const token = jwt.sign(
      {
        expiresIn: "1h",
        data: user,
      },
      secretKey
    );
    res.status(200).json({token});
  } else {
    res.status(404).send({
      error: "Este usuario no está registrado en la base de datos",
      code: 404,
    });
  }
});
