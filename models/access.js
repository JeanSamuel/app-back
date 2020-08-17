'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Access = sequelize.define("Access", {
        groupId: DataTypes.INTEGER,
        accessC: DataTypes.BOOLEAN,
        accessR: DataTypes.BOOLEAN,
        accessU: DataTypes.BOOLEAN,
        accessD: DataTypes.BOOLEAN
    }, {});
    Access.associate = (models) => {
        // define association here
        Access.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
    }
    return Access;
};