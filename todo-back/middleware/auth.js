const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.decoded = decoded;
    console.log('Decoded token:', decoded);
    next();
  });
}

module.exports = verifyToken;
