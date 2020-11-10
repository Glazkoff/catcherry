"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      Teams.belongsTo(models.Organizations, {
        foreignKey: "organizationId",
        as: "organization"
      });
      Teams.hasOne(models.TeamCustomization, {
        foreignKey: "teamId",
        as: "customization",
      });
=======
      // Teams.hasOne(models.TeamCustomization, {
      //   foreignKey: "teamId",
      //   as: "customization",
      // });
>>>>>>> team-members-feature
      // FIXME: При запросе на добавление оповещения возникает ошибка 
      //insert or update on table \"Notifications\" violates foreign key constraint \"Notifications_authorId_fkey\"
      
      Teams.hasMany(models.Notifications, {
        foreignKey: "teamId",
        as: "notification",
      });
      Teams.hasMany(models.Tasks, {
        foreignKey: "teamId",
        as: "tasksTeam"
      });
      Teams.hasMany(models.UsersInTeams, {
        foreignKey: "teamId",
        as: "team"
      });

    }
  }
  Teams.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      maxUsersLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Teams",
    }
  );
  return Teams;
};
