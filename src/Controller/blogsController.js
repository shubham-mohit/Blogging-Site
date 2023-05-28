const blogsModel = require('../Models/blogsModel');
const authorModel = require('../Models/authorModel')
const ObjectId = require('mongoose').Types.ObjectId;

const blogs = async (req, res) => {
    const { title, body, authorId, category } = req.body
    try {
        if (!title )  return res.status(400).send({ message: "Please provide title, It's mandatory" }) 
        if (!body )  return res.status(400).send({ message: "Please provide body, It's mandatory " }) 
        if (!authorId )  return res.status(400).send({ message: "Please provide authorId, It's mandatory" }) 
        if (!category )  return res.status(400).send({ message: "Pleade provide category, It's mandatory" }) 


        else if (!ObjectId.isValid(authorId)) return res.status(400).send({ message: "author id is not valid" })
        else {
            if (authorId != req.authorId) return res.status(400).send({ status: false, message: "Provided author id is not valid for creating a blog" })
            const author = await authorModel.findById(authorId)
            if (!author) return res.status(400).send({ message: "author invalid/ author not found" })
            else {
                const blog = await blogsModel.create(req.body)
                res.status(201).send({ status: true, data: blog })
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
const getBlogs = async (req, res) => {
    try {
        const { authorId, category, tag, subcategory } = req.query
        const data = await blogsModel.find({ isDeleted: false, authorId: req.authorId })
        // console.log(data);
        if (authorId) {

            if (req.authorId != authorId) return res.status(401).send({ status: false, message: "unauthorized author" })
        }
        if (!authorId && !category && !subcategory && !tag) return res.status(200).send({ status: true, message: "all blogs", data: data })
        else {
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
                res.status(400).send({ status: false, message: "No Blog Found" })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const update = async function (req, res) {

    try {
        let data = req.body
        if (!req.params.blogId) return res.status(404).send({ message: "Blog Id is not provide" })
        else {
            const blogAuthor = await blogsModel.findOne({ _id: req.params.blogId, authorId: req.authorId, isDeleted: false })
            if (!blogAuthor) return res.status(401).send({ status: false, message: "UnAuthorized Blog" })
            else if (!ObjectId.isValid(req.params.blogId)) return res.status(404).send("BlogId not valid")
            else if (!req.body) return res.status(400).send({ message: `didn't provide any data for update` })
            else {
                let blog = await blogsModel.findOne({ _id: req.params.blogId, isDeleted: false, authorId: req.authorId })
                if (req.body.tags) {
                    const tags = blog.tags
                    tags.push(req.body.tags)
                    data.tags = tags
                }
                if (req.body.subcategory) {
                    const subcategory = blog.subcategory
                    subcategory.push(req.body.subcategory)
                    data.subcategory = subcategory
                }
                if (!blog) { return res.status(400).send("BlogId is not match") }
                else {
                    const updateBlog = await blogsModel.findOneAndUpdate({ _id: req.params.blogId, isDeleted: false }, data, { new: true })
                    res.status(200).send({ status: true, msg: "update successfully", data: updateBlog })
                }
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


const blogDeleteId = async (req, res) => {
    try {
        if (!req.params.blogId) return res.status(404).send({ message: "Blog Id is not provide" })
        else {
            const blogId = req.params.blogId;
            const findBlog = await blogsModel.findById(blogId)
            if (findBlog.authorId != req.authorId) return res.status(403).send({ status: false, message: "User is not authorized to delete blog" })
            else if (!ObjectId.isValid(blogId)) return res.status(400).send({ message: "Blog id is not valid" })
            else if (!findBlog) return res.status(404).send({ status: false, message: "Blog not found" })
            else {
                const blog = await blogsModel.findOneAndUpdate(
                    { _id: blogId, isDeleted: false, authorId: req.authorId },
                    { $set: { deletedAt: Date.now(), isDeleted: true } },
                    { new: true }
                );
                res.status(200).send({ status: true, message: "Blog Delete SuccessFully" });
            }
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

const deleteBlogQuery = async (req, res) => {
    try {
        const data = req.query
        const { tags, authorId, subcategory, isPublished, category } = data
        if (!tags && !authorId && !subcategory && !isPublished && !category) return res.status(400).send({ status: false, msg: "atLeast one of the required fields" });
        if (authorId) {
            if (authorId != req.authorId) return res.status(400).send({ status: false, msg: "Provide authorId is not authorized for delete blog" });
        }
        const blog = await blogsModel.find({ authorId: req.authorId, ...data, isDeleted: false })
        if (blog.length === 0) return res.status(404).send({ status: false, msg: "blog not found" });
        const deletedBlog = await blogsModel.updateMany({ authorId: req.authorId, ...data, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true, msg: `${deletedBlog.modifiedCount} deleted successfully` });
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// const myMethod = async (req, res) => {
//     try {
//         const data = await blogsModel.find({ authorId: req.authorId, isDeleted: false, tags: "JS" });
//         res.send(data)
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// }

module.exports = { blogs, getBlogs, update, blogDeleteId, deleteBlogQuery }
