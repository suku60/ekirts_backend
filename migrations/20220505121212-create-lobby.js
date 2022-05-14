'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lobbies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      lobbyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      privateGame: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      inactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      full: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      playersSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
      turnSecondsTimer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 8,
      },
      gameMaxMinutesTimer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lobbies');
  }
};