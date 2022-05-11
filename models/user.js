'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'userId'
      });
      this.hasMany(models.Lobby, {
        foreignKey: 'userId'
      });
      // We're leaving all trophies relations unavailable for now
      // this.hasMany(models.Trophy, {
      //   foreignKey: 'userId'
      // });
    }
  }
  User.init({
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    trophies: DataTypes.INTEGER,
    banned: DataTypes.BOOLEAN,
    lobbyCreationRestricted: DataTypes.BOOLEAN,
    adminAccess: DataTypes.BOOLEAN,
    adminUser: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};