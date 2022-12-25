const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cnic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokens:{
        type:DataTypes.STRING,
        allowNull:true
    }
  });



  Users.addHook("beforeCreate", async (user, options) => {
    if (user.password || user.tokens) {
      const salt = await bcrypt.genSaltSync(10, "a");
      user.password = bcrypt.hashSync(user.password, salt);
       user.tokens = JWT.sign({ id: user.id }, "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX")
    }
  });

  return Users;
};

// class User extends Model {}
// User.init({
//   username: DataTypes.STRING,
//   mood: {
//     type: DataTypes.ENUM,
//     values: ['happy', 'sad', 'neutral']
//   }
// }, {
//   hooks: {
//     beforeValidate: (user, options) => {
//       user.mood = 'happy';
//     },
//     afterValidate: (user, options) => {
//       user.username = 'Toni';
//     }
//   },
//   sequelize
// });
