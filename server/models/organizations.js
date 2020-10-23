"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      Organizations.belongsTo(models.Users, {
        foreignKey: "ownerId",
        as: "user",
      });
      Organizations.belongsTo(models.OrganizationsTypes, {
        foreignKey: "organizationTypeId",
        as: "organizationType",
      });
      // Organizations.hasMany(models.Teams, {
      //   onDelete: "cascade",
      //   foreignKey: "organizationId",
      //   as: "teams",
      // });
=======
      // FIXME: раскомментирование вызывает ошибку при удалении из Users
      // Organizations.belongsTo(models.Users, {
      //   foreignKey: "ownerId",
      //   as: "user",
      // });
      // FIXME: раскомментирование вызывает ошибку
      // Organizations.belongsTo(models.OrganizationsTypes, {
      //   foreignKey: "organizationTypeId",
      //   as: "organizationType",
      // });
      Organizations.hasMany(models.Teams, {
        onDelete: "cascade",
        foreignKey: "organizationId",
        as: "teams",
      });
>>>>>>> f7f02858bbfe657a0f04e24bdbecb06482ad47af
    }
  }
  Organizations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxTeamsLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Organizations",
    }
  );
  return Organizations;
};
