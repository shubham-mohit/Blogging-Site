const blogsModel=require('../Models/blogsModel');
const authorModel = require('../Models/authorModel') 

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
                    res.status(201).send({status: true,data:blogs})
                }
            }
        }
        catch(error){
            res.status(500).send({status: false, message: error.message})
        }
    }

    /* - Returns all blogs in the collection that aren't deleted and are published
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#Get-Blogs-Response-Structure) 
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
- Filter blogs list by applying filters. Query param can have any combination of below filters.
  - By author Id
  - By category
  - List of blogs that have a specific tag
  - List of blogs that have a specific subcategory
example of a query url: blogs?filtername=filtervalue&f2=fv2*/
    const getBlogs = async (req, res) => {
        try {
            const {authorId, category, tag, subcategory} = req.query
            const data = await blogsModel.find({isDeleted : false})
            let filterBlogs = data.filter(blogs =>{
                if(blogs.authorId == authorId){
                    return blogs
                }
                if(blogs.category == category){
                    return blogs
                }
                if((blogs.tags).includes(tag)){
                    return blogs
                }
                if((blogs.subcategory).includes(subcategory)){
                    return blogs
                }
            })

            if(filterBlogs.length > 0){
                res.status(200).send({status: true, message: "Blogs List", data : filterBlogs})
            }
            else{
                res.status(404).send({status: false, message: "No Blog Found"}) 
            }
            
        } catch (error) {
            res.status(500).send({status: false, message : error.message})
        }
    }







  const update = async function(req,res){
    let data = req.body
    try{
        if(!ObjectId.isValid(req.params.blogId))
         { return res.status(400).send("Id not found")}
        else{
            let checkout = await blogsModel.findById(req.params.blogId)
            if(!checkout) 
            {return res.status(400).send("Id not match")}
            else{
                let update = await blogsModel.findByIdAndUpdate( req.params.blogId,data,{new:true})
                res.status(201).send({msg: "update successfully", status:true , data: update})
            }
        }
    }
    catch(error){
        res.send(error.message)
    }
}
  

const blogdelete=async (req, res) => {
    const blogId = req.params.blogId;
  
    try {
      const blog = await blogsModel.findOneAndUpdate(
        { _id: blogId, deletedAt: null },
        { $set :{deletedAt:  Date.now()} },
        {new:true}
      );
  
      if (blog) {
        return res.status(200).send({status:true, message:""});
      } else {
        return res.status(404).send({ error: 'Blog not found' });
      }
    } catch (err) {
      return res.status(500).send({ error: err.message});
    }
  };

module.exports = {blogs, getBlogs,update,blogdelete}
