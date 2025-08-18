const dotenv = require("dotenv")
const rateLimit = require('express-rate-limit')

const commentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 5, // สูงสุด 5 requests ต่อ windowMs
  message: {
    error: "คุณส่งคอมเมนต์บ่อยเกินไป กรุณารอสักครู่"
  }
})

dotenv.config()

const supabase = require('../config/supabase')
const transporter = require('../config/email')

const router = require('express').Router()

router.post('/addComment' ,  commentLimiter, async (req , res)=>{
    const {comment , uid} = req.body
    
    const { data, error } = await supabase
        .from("comments")   
        .insert([{ comment, uid }])
        .select()

    if (error) return res.status(400).json({ error: error.message })

    await transporter.sendMail({
        from: `"CukeCute" <${process.env.EMAIL_NAME}>`,
        to: process.env.ADMIN_MAIL.split(","),
        subject: "📩 มีคอมเมนต์ใหม่แล้ว!",
        text: `มีคนคอมเมนต์ใหม่ว่า: "${comment}"`
    })

  res.json({ data , message: "comment added and email sent" })
})

module.exports = router