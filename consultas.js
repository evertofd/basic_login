const { Pool } = require("pg");
require('dotenv').config(); 

const pool = new Pool({
  user: process.env.USER_DATABSE,
  host: process.env.HOST_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE,
  port: 5432,
});

exports.nuevoUsuario = async (email, nombre, password) => {
  const result = await pool.query(
    `INSERT INTO auth (email, nombre, password) values ('${email}', '${nombre}', '${password}') RETURNING *`
  );
  const usuario = result.rows[0];
  return usuario;
};

exports.getUsuario = async (email, password) => {
  try {
    const result = await pool.query(
      `SELECT * FROM auth WHERE email = '${email}' AND password = '${password}'`
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
    return false;
  }
};
