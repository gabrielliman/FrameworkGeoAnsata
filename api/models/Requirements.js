const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Requirements = sequelize.define('Requirements', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    OriginalText: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

  Requirements.associate = (models) => {
    Requirements.hasMany(models.SubRequirements, {
      onDelete: "cascade",
    });
    Requirements.belongsTo(models.SubSections); // Adiciona a associação belongsTo a SubSections
  };

  return Requirements;
};
