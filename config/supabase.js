const { createClient } = require("@supabase/supabase-js")
const dotenv = require("dotenv")

dotenv.config()

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.MY_SECERT
)

module.exports = supabase