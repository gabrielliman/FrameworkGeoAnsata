const { DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes) =>{
const Frameworks = sequelize.define('Frameworks', {
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
},{timestamps: false});

Frameworks.associate = (models) =>{
  Frameworks.hasMany(models.Instances, {
    onDelete:"cascade",});
    Frameworks.hasMany(models.Sections, {
      onDelete:"cascade",});
}

return Frameworks;
};

