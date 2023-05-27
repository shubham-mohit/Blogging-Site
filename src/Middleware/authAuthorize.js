const jwt = require("jsonwebtoken");
const { SECRETE_KEY } = require("../../config");

const authorization = (req, res, next) => {
  try {
    if (!req.headers[`x-api-key`]) return res.status(400).send({ status: false, message: "Please provide headers." });
    else {
      const token = req.headers[`x-api-key`]
      if (!token) return res.status(400).send({ status: false, message: "Please provide token." });
      else {
        const DecodeToken = jwt.verify(token, SECRETE_KEY)
        if (!DecodeToken) return res.status(400).send({ status: false, message: "Invalid token." });
        else {
          req.authorId = DecodeToken.userId;
          next();
        }
      }
    }
  }
  catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

module.exports = authorization;