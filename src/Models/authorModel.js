//{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: { 
    type: String, 
    required: true },
  email: { type: String, 
    required: true, 
    unique: true ,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
},
  password: { 
    type: String,
     required: true },
},{timestamps:true});

module.exports = mongoose.model("Author", authorSchema);
