"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // FIXME: раскомментирование вызывает ошибку при удалении из Users
      Organizations.belongsTo(models.Users, {
        foreignKey: "ownerId",
        as: "owner"
      });
      // FIXME: раскомментирование вызывает ошибку
      Organizations.belongsTo(models.OrganizationsTypes, {
        foreignKey: "organizationTypeId",
        as: "organizationType"
      });
      Organizations.hasMany(models.Teams, {
        foreignKey: "organizationId",
        as: "organization"
      });
      Organizations.hasMany(models.Posts, {
        foreignKey: "organizationId",
        as: "posts"
      });
    }
  }
  Organizations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organizationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      maxTeamsLimit: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Organizations"
    }
  );
  return Organizations;
};
