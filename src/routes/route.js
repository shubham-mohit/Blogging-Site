const express = require('express')
const router = express.Router()
const {authors}=require('../Controller/authorController')
const {blogs}=require('../Controller/blogsController')

router.post('/authors', authors)
router.post('/blogs', blogs)

module.exports = router