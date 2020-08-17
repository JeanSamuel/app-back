'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Contacts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cin: {
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                validaye: {
                    isEmail: true
                }
            },
            mobile: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            postalcode: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Contacts');
    }
};