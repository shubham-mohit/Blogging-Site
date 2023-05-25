const express = require('express')
const router = express.Router()
const {authors}=require('../Controller/authorController')
const {blogs, getBlogs}=require('../Controller/blogsController')

router.post('/authors', authors)
router.post('/blogs', blogs)

router.get('/blogs', getBlogs)

module.exports = router