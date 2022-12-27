const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.cookies.accessToken
    console.log(token)

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX");
    
    // retrieve the user details of the logged in user
    const user = await decodedToken;
    const userroot=await User.findOne({where:{cnic:user.cnic}})
    // pass the user down to the endpoints here
    request.cnic = user;

    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};