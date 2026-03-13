const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET || 'fallbacksecret', {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Added for better security
    maxAge: 3600000, // 1 hour
  });

  return token;
};

module.exports = generateToken;
