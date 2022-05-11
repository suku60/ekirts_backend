'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Player, {
        foreignKey: 'lobbyId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Lobby.init({
    lobbyName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    privateGame: DataTypes.BOOLEAN,
    inactive: DataTypes.BOOLEAN,
    full: DataTypes.BOOLEAN,
    playersSize: DataTypes.INTEGER,
    turnSecondsTimer: DataTypes.INTEGER,
    gameMaxMinutesTimer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lobby',
  });
  return Lobby;
};