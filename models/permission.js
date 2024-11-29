'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Permission can belong to many Roles through RolePermissions
      Permission.belongsToMany(models.Role, {
        through: 'RolePermissions', // Name of the junction table
        foreignKey: 'permissionId', // Foreign key in RolePermissions for Permission
        otherKey: 'roleId', // Foreign key in RolePermissions for Role
      });
    }
  }
  Permission.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );
  return Permission;
};
