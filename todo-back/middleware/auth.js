// middleware/auth.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); // Replace with your secret key

function verifyToken(req, res, next) {
  // Get the token from the request header
  const token = req.headers.authorization;
  console.log('token',token,jwtSecret)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.decoded = decoded;
    console.log('Decoded token:', decoded);
    next(); // Move on to the next middleware or route handler
  });
}

module.exports = verifyToken;
