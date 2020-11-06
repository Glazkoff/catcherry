"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersInTeams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // UsersInTeams.belongsTo(models.Users, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      UsersInTeams.belongsTo(models.Teams, {
        foreignKey: "teamId",
        as: "team",
      });
      UsersInTeams.belongsTo(models.Roles, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }
  UsersInTeams.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UsersInTeams",
    }
  );
  return UsersInTeams;
};
