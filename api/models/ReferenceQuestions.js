const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ReferenceQuestions = sequelize.define('ReferenceQuestions', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Text: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

  ReferenceQuestions.associate = (models) => {
    ReferenceQuestions.hasMany(models.Questions, {
      onDelete: "cascade",
    });
  };

  return ReferenceQuestions;
};
