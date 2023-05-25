const authorModel = require('../Models/authorModel')

const authors = async (req, res) => {
    try {
        let data = req.body
        if(!data) return res.status(400).send({status:false , message : 'Please provide author data'})
        let userAuthor = await authorModel.create(data)
        res.status(201).send(userAuthor)
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

    module.exports = { authors }