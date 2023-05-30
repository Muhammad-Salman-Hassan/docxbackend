// applicationImage.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ApplicationImage = sequelize.define('ApplicationImage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_type: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // applicationId:{
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });
 

  return ApplicationImage;
};
