"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Users, {
        foreignKey: "authorId",
        as: "author"
      });
      Comments.belongsTo(models.Posts, {
        foreignKey: "postId",
        as: "post"
      });
    }
  }
  Comments.init(
    {
      authorId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      body: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      dateAdd: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Comments"
    }
  );
  return Comments;
};
