const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'assets'))
app.set('view engine', 'ejs')

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const groupRoute = require('./routes/group')

dotenv.config()

const PORT = process.env.PORT || 8080 


mongoose.connect(process.env.USER_DATABASE_URL, () => {
    console.log('connected to DB')
})


// middleware
app.use(express.json())


// Route middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/group', groupRoute)

app.listen(PORT, () => {
    console.log('authenticaion server is listening on port 8080')
})