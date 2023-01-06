const express = require('express')
const cookieParser = require("cookie-parser");
const app = express()

const port = 3001
const db=require("./models/index")

app.use(cookieParser());

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

app.use(express.json())



app.use('/',routes)
app.use('/dashboard',profile)

  

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})


