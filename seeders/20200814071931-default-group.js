'use strict';
module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Groups', [{
            name: 'Administrateur'
        }])
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Groups', null, {});
    }
};