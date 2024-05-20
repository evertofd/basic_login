const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const database = require("./usuarios")

// Ruta al archivo que quieres leer
exports.nuevoUsuario = (email, name, password) => {
  try {
      const {usuarios} = eval(database);
      let exist_usuario = usuarios.find(usuario => usuario.email === email)
      if(exist_usuario){
        throw new Error("Usuario ya existe")
      }
      usuarios.push({ id: uuidv4(), name, email, password });
      const newFileContent = `module.exports = ${JSON.stringify({ usuarios }, null, 2)};`;
      fs.writeFileSync("./usuarios.js", newFileContent, { encoding: 'utf8' });
    } catch (error) {
      console.error("Error al crear al usuario:", error);
      throw new Error(error.message)
    }
  };

exports.getUsuario = async (email, password) => {
  try {
    const {usuarios} = eval(database);
    let usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password)
    return usuario;
  } catch (e) {
    console.log(e);
    return false;
  }
};
