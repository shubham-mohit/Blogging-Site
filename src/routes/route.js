const express = require('express')
const router = express.Router()
const {authors}=require('../Controller/authorController')
const {blogs, getBlogs, update, blogDelete, deleteBlog}=require('../Controller/blogsController')

router.post('/authors', authors)
router.post('/blogs', blogs)
router.put("/update/:blogId" , update)
router.get('/blogs', getBlogs)
router.delete('/blogs/:blogId',blogDelete )
router.delete('/blogs',deleteBlog )

module.exports = router