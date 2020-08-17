'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        name: DataTypes.STRING,
        loc: DataTypes.STRING
    }, {});

    Department.associate = (models) => {
        //
    }
    return Department;
};