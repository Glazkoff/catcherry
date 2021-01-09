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
      PointsOperations.belongsTo(models.Points, {
        foreignKey: "pointAccountId",
        as: "userPointsOperation"
      });
    }
  }
  PointsOperations.init(
    {
      pointAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      delta: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      operationDescription: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "PointsOperations"
    }
  );
  return PointsOperations;
};
