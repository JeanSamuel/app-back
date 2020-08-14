'use strict';
module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Departments', [{
            loc: 'N/A',
            name: 'N/A'
        }])
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Departments', null, {});
    }
};