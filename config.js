const dotenv = require('dotenv').config();
const {PORT, SECRETE_KEY, MONGOOSE_CONNECTION} = process.env

module.exports = {PORT : PORT, SECRETE_KEY : SECRETE_KEY, MONGOOSE_CONNECTION : MONGOOSE_CONNECTION}