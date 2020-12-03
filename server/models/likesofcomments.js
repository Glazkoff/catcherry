"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LikesOfComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LikesOfComments.belongsTo(models.Users, {
        foreignKey: "id",
        as: "userLikeComments"
      });
    }
  }
  LikesOfComments.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "LikesOfComments"
    }
  );
  return LikesOfComments;
};
