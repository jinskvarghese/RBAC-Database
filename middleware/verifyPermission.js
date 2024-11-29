const jwt = require('jsonwebtoken');
const { User, RolePermission, Permission } = require('../models');

const verifyPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      // Extract the JWT token from headers
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided.' });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, 'your-secret-key');
      const userId = decoded.id;

      // Fetch user and their permissions
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const rolePermissions = await RolePermission.findAll({
        where: { roleId: user.roleId },
        include: {
          model: Permission,
          attributes: ['name'], // Fetch only the name attribute of Permission
        },
      });

      // Extract user permissions
      const userPermissions = rolePermissions.map((rp) => rp.Permission.name);

      // Check if the required permission exists
      if (!userPermissions.includes(permissionName)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions.' });
      }

      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Permission verification error:', error);
      return res.status(401).json({ error: 'Unauthorized: Invalid token or error in permission verification.' });
    }
  };
};

module.exports = verifyPermission;
