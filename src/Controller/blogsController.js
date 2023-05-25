const blogsModel=require('../Models/blogsModel');
const authorModel = require('../Models/authorModel')  
const ObjectId = require('mongoose').Types.ObjectId

const blogs=async (req,res) => {
        let data = req.body
        if(!data.authorId) {return res.send("Author Id not present")}
        // else if(!ObjectId.isValid(data.authorId)) {return res.send("author id not valid")}
        else{
            let author = await authorModel.findById(data.authorId)
            if(!author) {return res.send("author invalid")}
            else{
                let blogs = await blogsModel.create(data)
                res.send({data:blogs})
            }
        }
    }
    
module.exports.blogs = blogs
