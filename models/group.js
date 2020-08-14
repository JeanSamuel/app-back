'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: DataTypes.STRING
    }, {});
    Group.associate = (models) => {
        // define association here
        Group.hasMany(models.Access, {foreignKey: "groupId", as: "accesses"});
    }
    return Group;
};