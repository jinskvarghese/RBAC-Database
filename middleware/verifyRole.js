const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const user = await User.findByPk(decoded.id);

      if (!user || !allowedRoles.includes(user.roleId)) {
        return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = verifyRole;
