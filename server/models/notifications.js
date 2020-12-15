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
      Notifications.belongsTo(models.Users, {
        foreignKey: "authorId",
        as: "author"
      });
      Notifications.belongsTo(models.Organizations, {
        foreignKey: "organizationId",
        as: "notificationOrganization"
      });
      Notifications.hasMany(models.ReadNotification, {
        foreignKey: "notificationId",
        as: "readNotification"
      });
      Notifications.hasOne(models.TypeNotification, {
        foreignKey: "typeId",
        as: "typeNotification"
      });
    }
  }
  Notifications.init(
    {
      body: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      teamId: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      userId: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Notifications"
    }
  );
  return Notifications;
};
