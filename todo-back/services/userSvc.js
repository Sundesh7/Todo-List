const db = require('../db');
const bcrypt = require('bcrypt');

async function userRegister(obj) {
  const { Name, Email, Password } = obj;
  const cryptedPassword = await bcrypt.hash(Password, 10);
  const userQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING id;`;
  try {
    const user = await db.one(userQuery, [Name, Email, cryptedPassword]);
    return user.id;

  } catch (error) {
    if (error.code === '23505') {
      return error.code;
    } else {
      throw error;
    }
  }
}
async function userSignin(obj) {
  const { Email, Password } = obj;
  const userQuery = `SELECT * FROM users WHERE email = $1`;
  try {
    const user = await db.one(userQuery, [Email]);
    const match = await bcrypt.compare(Password, user.password);
    if (match) {
      return user;
    } else {
      return null;
    }

  } catch (error) {
    return error.received;
  }
}
module.exports = {
  userRegister,
  userSignin,
}