"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeNotification.belongsTo(models.Notifications, {
        foreignKey: "typeId",
        as: "typeNotification"
      });
    }
  }
  TypeNotification.init(
    {
      typeName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "TypeNotification"
    }
  );
  return TypeNotification;
};
