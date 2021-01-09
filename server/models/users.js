"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Organizations, {
        onDelete: "cascade",
        foreignKey: "ownerId",
        as: "owner"
      });
      // FIXME: При запросе на добавление оповещения возникает ошибка
      //insert or update on table \"Notifications\" violates foreign key constraint \"Notifications_authorId_fkey\"

      Users.hasMany(models.Notifications, {
        foreignKey: "authorId",
        as: "notificationAuthor"
      });
      Users.hasMany(models.ReadNotification, {
        foreignKey: "userId",
        as: "readNotificationUser"
      });
      Users.hasMany(models.Tasks, {
        foreignKey: "userId",
        as: "tasksUser"
      });
      Users.hasOne(models.Points, {
        foreignKey: "userId",
        as: "userPoints"
      });
      Users.hasMany(models.Posts, {
        foreignKey: "authorId",
        as: "posts"
      });
      Users.hasMany(models.Comments, {
        foreignKey: "authorId",
        as: "author"
      });
      // Users.hasMany(models.UsersInTeams, {
      //   foreignKey: "id",
      //   as: "userInTeam"
      // });
      Users.hasOne(models.Administrators, {
        foreignKey: "userId",
        as: "users"
      });
      Users.hasMany(models.LikesOfComments, {
        foreignKey: "userId",
        as: "likesCommentsOfUser"
      });
      Users.hasMany(models.LikesOfPosts, {
        foreignKey: "userId",
        as: "likesPostsOfUser"
      });
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      patricity: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      password: {
        // TODO: вспомнить, почему binary
        // type: DataTypes.STRING.BINARY,
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Users"
    }
  );
  return Users;
};
