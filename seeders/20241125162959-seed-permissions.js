'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      { name: 'read', createdAt: new Date(), updatedAt: new Date() },
      { name: 'write', createdAt: new Date(), updatedAt: new Date() },
      { name: 'delete', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};