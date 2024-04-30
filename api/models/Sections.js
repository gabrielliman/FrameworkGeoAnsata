const { DataTypes } = require('sequelize');


module.exports=(sequelize,DataTypes) => {
const Sections = sequelize.define('Sections', {
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
  }
}, {
  timestamps: false
});
Sections.associate = (models) =>{
  Sections.hasMany(models.SubSections, {
    onDelete:"cascade",});
};


return Sections;
};
