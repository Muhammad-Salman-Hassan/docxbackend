const express = require('express')
const cookieParser = require("cookie-parser");
const app = express()

const port = 3001
const db=require("./models/index")


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use('/uploads',express.static('uploads'))
app.use(cors(corsOptions))
// ?????Router????????????
const routes=require("./routes/routes")
const profile=require('./routes/profile')
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded())




app.use('/',routes)
app.use('/',profile)

  

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})


