"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init(
    {
      body: {
        type: DataTypes.JSONB,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      forAllUsers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      forAllOrganization: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      forAllTeam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notifications",
    }
  );
  return Notifications;
};
