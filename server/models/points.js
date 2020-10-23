"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Points extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Points.hasMany(models.PointsOperations, {
        foreignKey: "pointAccountId",
        as: "pointsOperation",
      });
      Points.belongsTo(models.Users);
    }
  }
  Points.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pointQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Points",
    }
  );
  return Points;
};
