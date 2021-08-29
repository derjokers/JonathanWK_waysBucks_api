'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      password: 'johndoe1945',
      image: 'johndoe.jpg',
      status: 'logged',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};