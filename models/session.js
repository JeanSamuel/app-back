'use strict';
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        userId: DataTypes.INTEGER,
        accessToken: DataTypes.STRING,
        accessTokenExpire: DataTypes.DATE,
        ip: DataTypes.STRING
    }, {});
    Session.associate = (models) => {
        // define association here
        Session.belongsTo(models.User, {foreignKey: 'userId',as: "user"})
    }
    return Session;
};