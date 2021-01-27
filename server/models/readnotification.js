"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReadNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ReadNotification.belongsTo(models.Notifications, {
      //   foreignKey: "notificationId",
      //   as: "ReadNotification"
      // });
      ReadNotification.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "userNotification"
      });
    }
  }
  ReadNotification.init(
    {
      notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      readOrNot: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "ReadNotification"
    }
  );
  return ReadNotification;
};
