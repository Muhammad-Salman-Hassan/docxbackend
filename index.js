const express = require('express')
const cookieParser = require("cookie-parser");
const app = express()
app.use(cookieParser())
const port = 3001
const db=require("./models/index")


const cors=require("cors");
const corsOptions ={
   origin:'https://muhammad-salman-hassan-automatic-umbrella-jw54944jp57fjw7-3000.preview.app.github.dev', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use('/uploads',express.static('uploads'))
app.use(cors(corsOptions))
// ?????Router????????????
const routes=require("./routes/routes")
const profile=require('./routes/profile')
const userApplication=require("./routes/userApplication")
const applicationImages=require("./routes/applicationImages")
app.use(express.json())
app.use(express.urlencoded())




app.use('/',routes)
app.use('/',profile)
app.use('/',userApplication)
app.use('/',applicationImages)
  

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})


