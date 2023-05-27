const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const dotenv = require('dotenv').config()
const route = require('./routes/route')
const { MONGOOSE_CONNECTION, PORT } = require('../config')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect(MONGOOSE_CONNECTION,{useNewUrlParser: true})
.then(()=> console.log("MongoDb is connected"))
.catch(error => console.log(error.message))

app.use("/" , route)

app.listen(PORT || 3000 , function () {
    console.log( "Express app running on Port" ,PORT ||3000)
})