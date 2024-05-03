const { DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes) => {
const Answers = sequelize.define('Answers', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Answer: {
    type: DataTypes.ENUM('Yes', 'No', 'Don\'t Apply'),
    defaultValue: 'No',
    allowNull: false
  }
}, {
  timestamps: false
});

return Answers;
}
