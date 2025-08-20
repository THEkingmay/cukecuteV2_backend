const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const commentRouter = require('./routes/comment')
// โหลดค่า .env
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/ping' , (req ,res)=>{
    res.status(200).json({massge : "ping server success"})
})
app.use('/comment' , commentRouter )

app.listen(PORT ,()=>{
    console.log("server run omn PORT " , PORT)
})



