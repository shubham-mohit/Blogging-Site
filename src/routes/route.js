const express = require('express')
const router = express.Router()
const { authors, login } = require('../Controller/authorController')
const { blogs, getBlogs, update, blogDeleteId, deleteBlogQuery } = require('../Controller/blogsController')
const authorization = require('../Middleware/authAuthorize')

router.post('/authors', authors)
router.post('/blogs', authorization, blogs)
router.put("/blogs/:blogId", authorization, update)
router.get('/blogs', authorization, getBlogs)
router.delete('/blogs/:blogId', authorization, blogDeleteId)
router.delete('/blogs', authorization, deleteBlogQuery)
router.post("/login", login)


module.exports = router