const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: false
  });

  Questions.associate = (models) => {
    Questions.hasMany(models.Answers, {
      onDelete: "cascade",
    });
    Questions.belongsTo(models.SubRequirements); // Adiciona a associação belongsTo a SubRequirements
    Questions.belongsTo(models.ReferenceQuestions); // Adiciona a associação belongsTo a ReferenceQuestions
  };

  return Questions;
};
