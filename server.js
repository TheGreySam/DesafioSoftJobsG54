const { Pool } = require('pg')
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
   
    host: process.env.PGUSER,
    user: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    //allowExitOnIdle: true
    
})

const getUser = async () => {
    const usuario = await pool.query("SELECT * FROM usuarios")
    console.log(usuario)
    return usuario
}

const verifyCred = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2"
    const values = [email, password]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount)
        throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
}

const registerUser = async (email, password, rol, lenguage) => {
    const consulta = "INSERT INTO usuarios WHERE email = $1, password = $2, rol = $3, lenguage = $4"
    const values = [email, password, rol, lenguage]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se pudo registrar este usuario con estas credenciales" }
}

module.exports = { getUser, registerUser, verifyCred }