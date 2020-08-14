'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Accesses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            groupId: {
                type: Sequelize.INTEGER
            },
            accessC: {
                type: Sequelize.BOOLEAN
            },
            accessR: {
                type: Sequelize.BOOLEAN
            },
            accessU: {
                type: Sequelize.BOOLEAN
            },
            accessD: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue:new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue:new Date()
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Accesses');
    }
};