'use strict';
module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        let p1 = queryInterface.addColumn('Users', 'email', {
            type: Sequelize.STRING, validate: {
                isEmail: true
            }
        });
        let p2 = queryInterface.addColumn('Users', 'phone', {type: Sequelize.STRING});
        let p3 = queryInterface.addColumn('Users', 'jobtitle', {type: Sequelize.STRING});
        let p4 = queryInterface.addColumn('Users', 'groupId', {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        });
        let p5 = queryInterface.addColumn('Users', 'departmentId', {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        });
        let p6 = queryInterface.addColumn('Users', 'addressId', {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        });
        let p7 = queryInterface.addColumn('Users', 'active', {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        }).then(() => {
            queryInterface.bulkUpdate("Users", {active: true}, {});
        });
        let p8 = queryInterface.addColumn('Users', 'createdAt', {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        });
        let p9 = queryInterface.addColumn('Users', 'updatedAt', {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        });
        return Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9]);
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        let p1 = queryInterface.removeColumn('Users', 'email');
        let p2 = queryInterface.removeColumn('Users', 'phone');
        let p3 = queryInterface.removeColumn('Users', 'jobtitle');
        let p4 = queryInterface.removeColumn('Users', 'groupId');
        let p5 = queryInterface.removeColumn('Users', 'departmentId');
        let p6 = queryInterface.removeColumn('Users', 'addressId');
        let p7 = queryInterface.removeColumn('Users', 'active');
        let p8 = queryInterface.removeColumn('Users', 'createdAt');
        let p9 = queryInterface.removeColumn('Users', 'updatedAt');
        return Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9]);
    }
};