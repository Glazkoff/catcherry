"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Organizations, {
        onDelete: "cascade",
        foreignKey: "ownerId",
        as: "organizations",
      });
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      patricity: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
