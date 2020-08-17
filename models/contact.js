'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("Contact", {
        cin: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        postalcode: DataTypes.STRING
    }, {});
    Contact.associate = (models) => {
        //
    }
    return Contact;
};