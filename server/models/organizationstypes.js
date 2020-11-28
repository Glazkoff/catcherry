"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrganizationsTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganizationsTypes.hasMany(models.Organizations, {
        // onDelete: "cascade",
        foreignKey: "organizationTypeId",
        as: "organizationType"
      });
    }
  }
  OrganizationsTypes.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrganizationsTypes",
    }
  );
  return OrganizationsTypes;
};
