const { DataTypes } = require('sequelize');

module.exports=(sequelize,DataTypes) => {
const Questions = sequelize.define('Questions', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
});
Questions.associate = (models) =>{
  Questions.hasMany(models.Anwsers, {
    onDelete:"cascade",});
};
return Questions;
};