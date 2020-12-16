"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RefreshSessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      refreshToken: {
        type: Sequelize.UUID
      },
      ua: {
        type: Sequelize.STRING
      },
      fingerprint: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expiresIn: {
        type: Sequelize.BIGINT,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RefreshSessions");
  }
};
