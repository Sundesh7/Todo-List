const db = require('../db');
const bcrypt = require('bcrypt');

async function userRegister(obj) {
    const {Name,Email,Password} = obj;
    console.log(Name,Email,Password)
    const cryptedPassword = await bcrypt.hash(Password, 10);
    console.log(Name,Email,Password,cryptedPassword)
    const userQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING id;`;
    try {
        console.log('try')
        const user = await db.one(userQuery,[Name, Email, cryptedPassword]);
        return user.id;
    
    } catch (error) {
      console.log('try3',user)
        if (error.code === '23505') {
            return error.code;
          } else {
            throw error;
          }
    }
  }
async function userSignin(obj){
    const {Email,Password} = obj;
    const userQuery = `SELECT * FROM users WHERE email = $1`;
    console.log('sdsd',Email,Password)
    try {
        const user = await db.one(userQuery,[Email]);
        const match = await bcrypt.compare(Password, user.password);
        console.log(match,user)
        if (match) {
            return user;
          } else {
            return null;
          }
    
    } catch (error) {
        console.log('error',error)
        throw error;
    }
}
module.exports = {
    userRegister,
    userSignin,
}