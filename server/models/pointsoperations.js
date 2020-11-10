"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointsOperations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PointsOperations.belongsTo(models.Points);
    }
  }
  PointsOperations.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      delta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PointsOperations",
    }
  );
  return PointsOperations;
};
