const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'No Token Provided. Access Denied',
    });
  }
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decodedTokenInfo;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: 'Session Expired, Kindly Login Again',
    });
  }
};

module.exports = { authMiddleware };
