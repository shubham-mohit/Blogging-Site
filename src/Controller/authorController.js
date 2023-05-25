const authorModel = require('../Models/authorModel')

const authors=async (req,res)=>{
    let data=req.body
    let userAuthor=userModel.create(data)
    res.status(200).send(userAuthor)
}

module.exports ={authors}