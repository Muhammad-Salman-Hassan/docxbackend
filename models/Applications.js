module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      rollno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      applicationId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnic:{
        type:DataTypes.STRING,
        allowNull:false
      },
      fathername: {
        type: DataTypes.STRING,
        allowNull: false,
      }, phone: {
        type: DataTypes.STRING,
        allowNull: false,
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
       applicationStatus: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
      },
      reciptNumber:{
        type:DataTypes.STRING,
        allowNull:true
      }

    },

  );

  //   Users.addHook("beforeCreate", async (user, options) => {
  //     if (user.password || user.tokens) {
  //       const salt = await bcrypt.genSaltSync(10, "a");
  //       user.password = bcrypt.hashSync(user.password, salt);
  //       //  user.tokens = JWT.sign({ id: user.id }, "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX")
  //     }
  //   });

  return Application;
};
