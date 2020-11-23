"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LikesOfPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LikesOfPosts.belongsTo(models.Users, {
        foreignKey: "id",
        as: "userLikePosts"
      });
    }
  }
  LikesOfPosts.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "LikesOfPosts",
    }
  );
  return LikesOfPosts;
};
