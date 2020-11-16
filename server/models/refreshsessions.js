"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshSessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TODO: добавить связь с таблицей Users
    }
  }
  RefreshSessions.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ua: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiresIn: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefreshSessions",
    }
  );
  return RefreshSessions;
};
