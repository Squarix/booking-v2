const {DataTypes} = require('sequelize');


module.exports = (sequelize) =>
  sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
    },
    hues: {
      type: DataTypes.STRING
    },
    predictions: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'image',
    timestamps: false,
  });
