'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('SuperAdmin@123', 10);

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Super',
        lastName: 'Admin',
        gender: 'other',
        birthday: '1990-01-01',
        address1: '123 Admin Street',
        address2: null,
        city: 'Admin City',
        country: 'Adminland',
        email: 'superadmin@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'superadmin@example.com',
    });
  },
};
