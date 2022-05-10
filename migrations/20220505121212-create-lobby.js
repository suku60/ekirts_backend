'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lobbies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lobbyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
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
        defaultValue: 4,
      },
      turnSecondsTimer: {
        type: Sequelize.INTEGER,
        defaultValue: 8,
      },
      gameMaxMinutesTimer: {
        type: Sequelize.INTEGER,
        defaultValue: 30,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lobbies');
  }
};