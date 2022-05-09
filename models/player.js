'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      this.belongsTo(models.Lobby, {
        foreignKey: 'lobbyId'
      });
    }
  }
  Player.init({
    playerColor: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    LobbyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};