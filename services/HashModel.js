const bcrypt = require("bcrypt")
const saltRounds = 10

const passwordhash=async(password,saltRounds)=>{
const hashpasword=await bcrypt.hash(password,saltRounds)
return hashpasword
}
console.log(passwordhash("salman",10))
// module.exports=passwordhash