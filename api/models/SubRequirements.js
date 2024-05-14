const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SubRequirements = sequelize.define('SubRequirements', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Class: {
      type: DataTypes.ENUM('Exploration', 'Resource', 'Reserve'),
      defaultValue: 'Exploration',
      allowNull: false
    },
    OriginalQuestion: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

  SubRequirements.associate = (models) => {
    SubRequirements.hasMany(models.Questions, {
      onDelete: "cascade",
    });
    SubRequirements.belongsTo(models.Requirements); // Adiciona a associação belongsTo a Requirements
  };

  return SubRequirements;
};
