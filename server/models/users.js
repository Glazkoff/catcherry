"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      patricity: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
