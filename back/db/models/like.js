module.exports = (sequelize, DataTypes) => {
  // TODO a faire plus tard
  return sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }
)}