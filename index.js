const express = require('express')
const cookieParser = require("cookie-parser");
const app = express()
app.use(cookieParser())
const port = 3001
const db=require("./models/index")


const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:3000', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use('/uploads',express.static('uploads'))
app.use(cors(corsOptions))
// ?????Router????????????
const routes=require("./routes/routes")
const profile=require('./routes/profile')
const userApplication=require("./routes/userApplication")
app.use(express.json())
app.use(express.urlencoded())




app.use('/',routes)
app.use('/',profile)
app.use('/',userApplication)

  

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})


