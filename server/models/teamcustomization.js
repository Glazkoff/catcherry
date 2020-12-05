"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamCustomization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamCustomization.belongsTo(models.Teams, {
        foreignKey: "teamId"
        // as: "teamCustomization"
      });
    }
  }
  TeamCustomization.init(
    {
      settings: {
        type: DataTypes.JSONB,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "TeamCustomization"
    }
  );
  return TeamCustomization;
};
