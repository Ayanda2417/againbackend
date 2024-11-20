//handle queries and errors on database only
const client = require("../configs/database");

const UserModel = {
  findUserByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email= $1;`;
    const data = await client.query(query, [email]);
    return data.rows;
  },

  insertUser: async (name, surname, email, hashedPassword, role) => {
    const query = `INSERT INTO users (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5);`;
    await client.query(query, [name, surname, email, hashedPassword, role]);
  },
};

module.exports = UserModel;
