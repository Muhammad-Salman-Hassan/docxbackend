const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const ProfileUser = sequelize.define(
    "UserProfile",
    {
      rollno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fathername: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passingyear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enrolmentno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      libraryid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilepic: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    
  );

//   Users.addHook("beforeCreate", async (user, options) => {
//     if (user.password || user.tokens) {
//       const salt = await bcrypt.genSaltSync(10, "a");
//       user.password = bcrypt.hashSync(user.password, salt);
//       //  user.tokens = JWT.sign({ id: user.id }, "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX")
//     }
//   });

  return ProfileUser;
};
