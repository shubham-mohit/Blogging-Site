const express = require('express')
const router = express.Router()
const { authors, login } = require('../Controller/authorController')
const { blogs, getBlogs, update, blogDelete, deleteBlog } = require('../Controller/blogsController')
const authorization = require('../Middleware/authAuthorize')

router.post('/authors', authors)
router.post('/blogs', blogs)
router.put("/update/:blogId", update)
router.get('/blogs',authorization, getBlogs)
router.delete('/blogs/:blogId', blogDelete)
router.delete('/blogs', deleteBlog)
router.post("/login", login)


module.exports = router