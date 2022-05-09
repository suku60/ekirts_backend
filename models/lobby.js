'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: 'lobbyId'
      });
    }
  }
  Movie.init({
    lobbyName: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    privateGame: DataTypes.BOOLEAN,
    playersSize: DataTypes.INTEGER,
    turnTimer: DataTypes.INTEGER,
    maxMinutesDuration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};