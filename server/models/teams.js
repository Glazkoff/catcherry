"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teams.hasOne(models.TeamCustomization, {
        foreignKey: "teamId",
        as: "customization",
      });
      Teams.hasMany(models.Notifications, {
        foreignKey: "teamId",
        as: "notification",
      });
      Teams.hasMany(models.Posts, {
        foreignKey: "teamId",
        as: "posts",
      });
    }
  }
  Teams.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      maxUsersLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Teams",
    }
  );
  return Teams;
};
