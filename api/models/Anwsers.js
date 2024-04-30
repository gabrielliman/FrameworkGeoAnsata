const { DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes) => {
const Anwsers = sequelize.define('Anwsers', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Anwser: {
    type: DataTypes.ENUM('Yes', 'No', 'Don\'t Apply'),
    defaultValue: 'No',
    allowNull: false
  }
}, {
  timestamps: false
});

return Anwsers;
}
