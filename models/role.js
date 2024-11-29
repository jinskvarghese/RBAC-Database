'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Role can have many Users
      Role.hasMany(models.User, { foreignKey: 'roleId' });

      // A Role can have many Permissions through the RolePermissions table
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions', // Name of the junction table
        foreignKey: 'roleId', // Foreign key in RolePermissions for Role
        otherKey: 'permissionId', // Foreign key in RolePermissions for Permission
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
