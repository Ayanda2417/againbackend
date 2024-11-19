const { Pool } = require("pg");

const pool= new Pool(process.env.DB_URL); //Configuring PostgresSQL Database

module.exports = pool;