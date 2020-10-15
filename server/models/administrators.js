"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Administrators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administrators.belongsTo(models.Users);
    }
  }
  Administrators.init(
    {
      userId: DataTypes.INTEGER
      // allowNull: false,
    },
    {
      sequelize,
      modelName: "Administrators",
    }
  );
  return Administrators;
};
