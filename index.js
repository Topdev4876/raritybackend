const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const dataSchema = require('./schema/data')
const app = express()

app.use(express.json())
app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
try {
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI)
    console.log("connection success!")
} catch(err){
    console.log(err)
}



app.listen(10001,()=>console.log("Listening 10001"))