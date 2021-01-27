"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users, {
        foreignKey: "authorId",
        as: "postUser"
      });
      Posts.hasMany(models.Comments, {
        foreignKey: "postId",
        as: "commentsByPost"
      });
      Posts.hasMany(models.LikesOfPosts, {
        foreignKey: "postId",
        as: "likesOfPost"
      });
    }
  }
  Posts.init(
    {
      body: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.JSONB,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Posts"
    }
  );
  return Posts;
};
