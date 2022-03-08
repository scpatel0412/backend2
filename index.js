const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 8000;
dotenv.config({path:"./config.env"})
const db = process.env.DATABASE;
const auth = require("./route/route")

mongoose.connect(db,() => ({
    useNewUrlParser:true,
    useFindAndModify:false
})).then(console.log('DB Connected'))
.catch(()=>{
    console.log('connection failed');
});
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
);


app.get("/",(req,res) => {
    res.send("Welcome to server all system operational")
})
app.use("/api",auth)
app.listen(PORT,() => {
    console.log(
        `your application is running on http://localhost:${PORT}`
      )
})
