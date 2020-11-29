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
        foreignKey: "userId",
        as: "userLikePosts"
      });
    }
  }
  LikesOfPosts.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LikesOfPosts",
    }
  );
  return LikesOfPosts;
};
