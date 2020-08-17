'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Contacts', [{
            cin: "220251011498",
            email: "rjs.samuel@yahoo.com",
            mobile: '0348400278',
            address: "IB 389 Andoharanofotsy",
            postalcode: "102",
            country: "Madagascar",
            city: "Antananarivo"
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here
         */
        await queryInterface.bulkDelete('Contacts', null, {});
    }
};