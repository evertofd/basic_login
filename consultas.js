const { Pool } = require("pg");
const pool = new Pool({
  user: "everto",
  host: "localhost",
  password: "123456",
  database: "auth",
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
