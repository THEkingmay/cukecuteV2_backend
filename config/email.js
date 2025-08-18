const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NAME, 
    pass: process.env.EMAIL_PASS 
  }
})

module.exports = transporter