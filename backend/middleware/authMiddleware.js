const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(
      token.split('Bearer ')[1],
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach user information to the request for use in subsequent middleware or routes
    req.user = user;
    next();
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = authMiddleware;
