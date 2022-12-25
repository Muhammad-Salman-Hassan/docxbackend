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

app.use(cors(corsOptions))
// ?????Router????????????
const routes=require("./routes/routes")

app.use(express.json())



app.use('/',routes)

  

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})


