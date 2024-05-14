const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    IsAdministrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  Users.associate = (models) => {
    Users.hasMany(models.Instances, {
      onDelete: "cascade",
    });
  };

  return Users;
};
