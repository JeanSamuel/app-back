'use strict';
let bcrypt = require('bcryptjs');

module.exports = {
  /**
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   * @typedef {import('sequelize')} Sequelize
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'sam',
      password: bcrypt.hashSync('sam', 10),
      name: 'RANDRIANASOLO',
      firstname: 'Jean Samuel',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
      type: 'A',
    }])
  },

  /**
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   * @typedef {import('sequelize')} Sequelize
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
