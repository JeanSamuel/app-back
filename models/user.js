'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        matricule: DataTypes.STRING,
        name: DataTypes.STRING,
        firstname: DataTypes.STRING,
        birthday: DataTypes.DATE,
        jobtitle: DataTypes.STRING,
        groupId: DataTypes.INTEGER,
        departmentId: DataTypes.INTEGER,
        contactId: DataTypes.INTEGER,
        type: {
            type: DataTypes.ENUM,
            values: ['A', 'U']
        },
        active: DataTypes.BOOLEAN
    }, {});
    User.associate = (models) => {
        User.hasMany(models.Session, { foreignKey: 'userId', as: "sessions" });
        User.belongsTo(models.Group, { foreignKey: 'groupId', as: "group" });
        User.belongsTo(models.Department, { foreignKey: 'departmentId', as: "department" });
        User.belongsTo(models.Contact, { foreignKey: 'contactId', as: "contact" });
    }
    return User;
};