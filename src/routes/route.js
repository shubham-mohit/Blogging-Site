const express = require('express')
const router = express.Router()
const { authors, login } = require('../Controller/authorController')
const { blogs, getBlogs, update, blogDelete, deleteBlog } = require('../Controller/blogsController')
const authorization = require('../Middleware/authAuthorize')

router.post('/authors', authors)
router.post('/blogs',authorization, blogs)
router.put("/update/:blogId",authorization, update)
router.get('/blogs',authorization, getBlogs)
router.delete('/blogs/:blogId',authorization, blogDelete)
router.delete('/blogs',authorization, deleteBlog)
router.post("/login", login)


module.exports = router