const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const dotenv = require('dotenv').config()
const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://Ketan_technetium_functionUp:iDikLHzqHJQQP656@clusterketantechnetium.pexlgni.mongodb.net/blogging_project?retryWrites=true&w=majority",{useNewUrlParser: true})
.then(()=> console.log("MOngoDb is connected"))
.catch(error => console.log(error.message))

app.use("/" , route)

app.listen(process.env.PORT || 3000 , function () {
    console.log( "Express app running on Port" , process.env.PORT || 3000 )
})