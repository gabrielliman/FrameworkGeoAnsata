const { DataTypes } = require('sequelize');


module.exports=(sequelize,DataTypes) => {
const SubSections = sequelize.define('SubSections', {
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
SubSections.associate = (models) =>{
  SubSections.hasMany(models.Requirements, {
    onDelete:"cascade",});
};


return SubSections;
};
