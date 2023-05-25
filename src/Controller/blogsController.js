const blogsModel=require('../Models/blogsModel');
const authorModel = require('../Models/authorModel')  
const ObjectId = require('mongoose').Types.ObjectId

const blogs=async (req,res) => {
    let data = req.body
    // if(ObjectId.isValid(data.authorid._id)){
    //     if(await authorModel.findById(data.authorid._id) ){
    //     let CreatedBlogs  = await blogsModel.create(req.body)
    //     return res.status(201).send({blogs :CreatedBlogs})
    //     }
    //     else{
    //        return res.send("")
    //     }
    // }
    // else{
    //     return res.status(400).send("invalid request with a response body ")
    // }
    if(!ObjectId.isValid(data.authorId)){
        return res.status(400).send("invalid request with a response body ")
    }else{
        if(await authorModel.findById(data.authorId) ){
            let createdBlogs  = await blogsModel.create(req.body)
            return res.status(201).send({blogs :createdBlogs})
        }
        else{
            return res.send("")
        }
    }
    
}
