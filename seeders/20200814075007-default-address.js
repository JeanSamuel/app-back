'use strict';
module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Addresses', [{
            lot: 'N/A',
            country: 'N/A',
        }])
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Addresses', null, {});
    }
};