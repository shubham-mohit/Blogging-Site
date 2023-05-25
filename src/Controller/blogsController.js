const blogsModel=require('../Models/blogsModel');
const authorModel = require('../Models/authorModel')  
const ObjectId = require('mongoose').Types.ObjectId

const blogs=async (req,res) => {
        let data = req.body
        try{
            if(!data.authorId) {return res.status(400).send("Author Id not present")}
            // else if(!ObjectId.isValid(data.authorId)) {return res.send("author id not valid")}
            else{
                let author = await authorModel.findById(data.authorId)
                if(!author) {return res.status(400).send("author invalid")}
                else{
                    let blogs = await blogsModel.create(data)
                    res.status(200).send({data:blogs})
                }
            }
        }
        catch(error){
            res.status(500).send(err)
        }
    }
    
module.exports.blogs = blogs
