const blogsModel = require('../Models/blogsModel');
const authorModel = require('../Models/authorModel')
const ObjectId = require('mongoose').Types.ObjectId;
const blogs = async (req, res) => {
    let { title, body, authorId, category } = req.body
    try {
        if (!title || !body || !authorId || !category) { return res.status(400).send({ message: "provide mandatory fields" }) }
        else if (!ObjectId.isValid(authorId)) return res.status(400).send({ message: "author id is not valid" })
        else {
            let author = await authorModel.findById(authorId)
            if (!author) return res.status(400).send("author invalid")
            else {
                let blog = await blogsModel.create(req.body)
                res.status(201).send({ status: true, data: blog })
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
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
        const { authorId, category, tag, subcategory } = req.query
        const data = await blogsModel.find({ isDeleted: false })
        let filterBlogs = data.filter(blogs => {
            if (blogs.authorId == authorId) {
                return blogs
            }
            if (blogs.category == category) {
                return blogs
            }
            if ((blogs.tags).includes(tag)) {
                return blogs
            }
            if ((blogs.subcategory).includes(subcategory)) {
                return blogs
            }
        })

        if (filterBlogs.length > 0) {
            res.status(200).send({ status: true, message: "Blogs List", data: filterBlogs })
        }
        else {
            res.status(404).send({ status: false, message: "No Blog Found" })
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}







const update = async function (req, res) {
    let data = req.body
    try {
        if (!ObjectId.isValid(req.params.blogId)) return res.status(404).send("Id not found")
        else if (!req.params.blogId) return res.status(404).send({ message: "Blog Id is not provide" })
        else if (!req.body) return res.status(400).send({ message: `didn't provide any data for update` })
        else {
            let blog = await blogsModel.findById(req.params.blogId)
            const tags = blog.tags
            tags.push(req.body.tags)
            data.tags = tags
            const subcategory = blog.subcategory
            subcategory.push(req.body.subcategory)
            data.subcategory = subcategory
            if (!blog) { return res.status(400).send("Id not match") }
            else {
                let updateBlog = await blogsModel.findByIdAndUpdate(req.params.blogId, data, { new: true })
                res.status(200).send({ status: true, msg: "update successfully", data: update })
            }
        }
    }
    catch (error) {
        res.send(error.message)
    }
}


const blogDelete = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const findBlog = await blogsModel.findById(blogId)
        if (!blogId) return res.status(404).send({ message: "Blog id not provided" });
        else if (!ObjectId.isValid(blogId)) return res.status(400).send({ message: "Blog id is not valid" })
        else if (!findBlog) return res.status(404).send({ status: false, message: "Blog not found" })
        const blog = await blogsModel.findByIdAndUpdate(
            blogId,
            { $set: { deletedAt: Date.now(), isDeleted: true } },
            { new: true }
        );
        res.status(200).send({ status: true, message: "" });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};





const deleteBlog = async (req, res) => {
    try {
        let data = req.query
        let { category, authorId,tags, subcategory, isPublished } = data
        if (!data) return res.status(400).send({ message: "mandotory field is required" })



        let blogdoc = await blogsModel.find({ $or: [{ category: category }, { authorId: authorId }, { subcategory: subcategory }, { isPublished: isPublished }] })


        if (!blogdoc.length > 0) {
            return res.status(404).send({ error: "Blog document not found" })
        }
        // let deleteBlog = await blogsModel.updateMany({ $or: [{ category: category }, { authorId: authorId },{ ispublished: isPublished }] }, { $set: { isDeleted: true } })

        const deleteBlog = {

        }

        if (category) {
            deleteBlog.category = category
        }
        if (authorId) {
            deleteBlog.authorId = authorId
        }
        if (isPublished) {
            deleteBlog.isPublished = isPublished
        }
        if (subcategory) {
            deleteBlog.subcategory = subcategory
        }

        if(tags){
            deleteBlog.tags = tags
        }

let blogDelete = await blogsModel.updateMany(deleteBlog,{$set:{isDeleted:true}});
console.log(blogDelete);
        res.status(201).send({ status: true, msg: "deleted successfully" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }


}

module.exports = { blogs, getBlogs, update, blogDelete, deleteBlog }
