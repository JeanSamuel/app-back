'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        matricule: DataTypes.STRING,
        name: DataTypes.STRING,
        firstname: DataTypes.STRING,
        birthday: DataTypes.DATE,
        birthdayloc: DataTypes.STRING,
        cin:DataTypes.STRING,
        type: {
            type: DataTypes.ENUM,
            values: ['A', 'U']
        },
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        jobtitle: DataTypes.STRING,
        groupId: DataTypes.INTEGER,
        departmentId: DataTypes.INTEGER,
        addressId: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN
    }, {});
    User.associate = (models) => {
        User.hasMany(models.Session, {foreignKey: 'userId', as: "sessions"});
        User.belongsTo(models.Group, {foreignKey: 'groupId', as: "group"});
        User.belongsTo(models.Department, {foreignKey: 'addressId', as: "address"});
    }
    return User;
};