const { DataTypes } = require('sequelize');
//Não é mais necessaria a seção de subrequisitos pela definição atual do sistema,
//ao clicar em um requisito deve-se ser redirecionado diretamente para as perguntas ligadas a ele
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
    SubRequirements.belongsTo(models.Requirements);
  };

  return SubRequirements;
};
