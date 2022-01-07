const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
// Import routes
const authRoute = require('./routes/auth')
dotenv.config()

const PORT = process.env.PORT || 8080 


mongoose.connect(process.env.USER_DATABASE_URL, () => {
    console.log('connected to DB')
})


// middleware
app.use(express.json())


// Route middleware
app.use('/api/user', authRoute)

app.listen(PORT, () => {
    console.log('authenticaion server is listening on port 8080')
})