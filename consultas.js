const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const path = require('path');

// Ruta al archivo que quieres leer
const filePath = path.join(__dirname, 'usuarios.js');

exports.nuevoUsuario = (email, name, password) => {
    try {
      const result = fs.readFileSync(filePath, { encoding: 'utf8' });
      const {usuarios} = eval(result);
      let exist_usuario = usuarios.find(usuario => usuario.email)
      if(exist_usuario){
        throw new Error("Usuario ya existe")
      }
      usuarios.push({ id: uuidv4(), name, email, password });
      const newFileContent = `module.exports = ${JSON.stringify({ usuarios }, null, 2)};`;
      fs.writeFileSync(filePath, newFileContent, { encoding: 'utf8' });
    } catch (error) {
      console.error("Error al crear al usuario:", error);
      throw new Error(error.message)
    }
  };

exports.getUsuario = async (email, password) => {
  try {
    const result = fs.readFileSync(filePath, { encoding: 'utf8' });
    const {usuarios} = eval(result);
    let usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password)
    return usuario;
  } catch (e) {
    console.log(e);
    return false;
  }
};
