const authorModel = require('../Models/authorModel')
const validator = require('validator');

const authors = async (req, res) => {
    try {
        const { fname, lname, email, password, title } = req.body
        if (!fname || !lname || !email || !password || !title) return res.status(400).send({ status: false, message: "Please provide all required fields" })
        else if(!["Mr", "Miss", "Mrs"] .includes(title)) return res.status(400).send({ status: false, message: "Please provide valid title" })  
        else if (!validator.isStrongPassword(password)) return res.status(400).send({ status: false, message: "please enter a strong password" })
        else {
            if (!validator.isEmail(email)) return res.status(400).send({ status: false, message: "Please provide a valid email" })
            const userAuthor = await authorModel.create(req.body)
            res.status(201).send({ status: true, data: userAuthor })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


// console.log(validator.isEmail("6375@gmail.com"))
// console.log(validator.isStrongPassword("Ketan@6060"))
module.exports = { authors }