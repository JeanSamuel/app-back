'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("Users", "type", {
            type: Sequelize.ENUM,
            values: ['A', 'U']
        }).then(() => {
            queryInterface.bulkUpdate("Users", {type: "A"}, {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Users", "type");
    }
};