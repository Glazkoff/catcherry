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
      Notifications.belongsTo(models.Teams, {
        foreignKey: "teamId"
        // as: "team"
      });
      Notifications.belongsTo(models.Users, {
        foreignKey: "authorId",
        as: "author"
      });
      Notifications.hasMany(models.ReadNotification, {
        foreignKey: "notificationId",
        as: "readNotification"
      });
    }
  }
  Notifications.init(
    {
      body: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      forAllUsers: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      forAllOrganization: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      forAllTeam: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Notifications"
    }
  );
  return Notifications;
};
