const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Instances = sequelize.define('Instances', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT
    },
    Class: {
      type: DataTypes.ENUM('Exploration', 'Resource', 'Reserve'),
      defaultValue: 'Exploration',
      allowNull: false
    }
  }, { timestamps: false });

  Instances.associate = (models) => {
    Instances.hasMany(models.Answers, {
      onDelete: "cascade",
    });
    Instances.belongsTo(models.Frameworks);
  };

  return Instances;
};
