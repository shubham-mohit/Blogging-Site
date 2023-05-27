const authorModel = require('../Models/authorModel')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { SECRETE_KEY } = require('../../config');

const authors = async (req, res) => {
    try {
        const { fname, lname, email, password, title } = req.body
        if (!fname || !lname || !email || !password || !title) return res.status(400).send({ status: false, message: "Please provide all required fields" })
        else if (!["Mr", "Miss", "Mrs"].includes(title)) return res.status(400).send({ status: false, message: "Please provide valid title" })
        else if (!validator.isStrongPassword(password)) return res.status(400).send({ status: false, message: "please enter a strong password" })
        else {
            const emailCheck = await authorModel.findOne({ email: email })
            if (!validator.isEmail(email)) return res.status(400).send({ status: false, message: "Please provide a valid email" })
            else if (emailCheck) return res.status(400).send({ status: false, message: "this email is already existing" })
            const userAuthor = await authorModel.create(req.body)
            res.status(201).send({ status: true, data: userAuthor })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) return res.status(400).send({ status: false, message: "please enter your email and password" })
        else if (!email) return res.status(400).send({ status: false, message: "Please provide a  email" })
        else if (!validator.isEmail(email)) return res.status(400).send({ status: false, message: "this email is Invalid" });
        else if (!password) return res.status(400).send({ status: false, message: "Please provide a password" })

        else {
            const userAuthor = await authorModel.findOne({ email: email, password: password })
            if (!userAuthor) return res.status(404).send({ status: false, message: "User not found" })
            else {
                const Token = jwt.sign({ userId: userAuthor._id }, SECRETE_KEY)
                if (!Token) return res.status(401).send({ status: false, message: "Token not generated" })
                res.status(200).send({ status: true, data: Token })
            }
        }
    }
    catch (err) { res.status(500).send({ status: false, message: err.message }) }
}
// console.log(validator.isEmail("6375@gmail.com"))
// console.log(validator.isStrongPassword("Ketan@6060"))
module.exports = { authors, login }