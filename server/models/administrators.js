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
      // FIXME: добавить явное указание внешнего ключа, как в примере ниже (Файл usersinteams.js)
      /**
        UsersInTeams.belongsTo(models.Users, {
          foreignKey: "userId",
          as: "user",
        });
      */
      Administrators.belongsTo(models.Users);
    }
  }
  Administrators.init(
    {
      userId: DataTypes.INTEGER,
      allowNull: false,
    },
    {
      sequelize,
      modelName: "Administrators",
    }
  );
  return Administrators;
};
