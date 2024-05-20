const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); 

exports.nuevoUsuario = (email, name, password) => {
    try {
      const result = fs.readFileSync("usuarios.json", { encoding: 'utf8', flag: 'r' });
      const resp = JSON.parse(result);
      const { usuarios } = resp;
      let exist_usuario = usuarios.find(usuario => usuario.email)
      if(exist_usuario){
        throw new Error("Usuario ya existe")
      }
      usuarios.push({ id: uuidv4(), name, email, password });
      fs.writeFileSync("usuarios.json", JSON.stringify({ usuarios }));
    } catch (error) {
      console.error("Error al crear al usuario:", error);
      throw new Error(error.message)
    }
  };

exports.getUsuario = async (email, password) => {
  try {
    const result = fs.readFileSync("usuarios.json", { encoding: 'utf8', flag: 'r' });
    const resp = JSON.parse(result);
    const { usuarios } = resp;
    let usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password)
    return usuario;
  } catch (e) {
    console.log(e);
    return false;
  }
};
