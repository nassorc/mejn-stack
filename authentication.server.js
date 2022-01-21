const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const app = express()

const verifyToken = require('./routes/verifyToken')

// app.use(express.static(path.resolve(__dirname, 'assets')))
app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/src', express.static(__dirname + 'assets/src'))
app.use('/image', express.static(__dirname + 'assets/image'))

app.use(favicon(__dirname + '/assets/image/favicon.ico'))

app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'))
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
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}


// Route middleware
app.use('/api/user', authRoute, (req, res) => {
    // res.set('Content-Type', 'text/html')
    // res.sendFile(path.join(__dirname, '/assets/landingPage.ejs'))
    res.render('landingPage')
})
app.use('/api/userboard', verifyToken, (req, res) => {

    res.render('user')
})
app.use('/api/userboard/about', verifyToken, (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send('user detail page')
})
app.use('/api/posts', postRoute)
app.use('/api/group', groupRoute)

app.use('/api/data/get', (req, res) => {
    console.log('data get invoked')
    res.send({mesg: 'hello user'})
})
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

app.listen(PORT, () => {
    console.log('authenticaion server is listening on port 8080')
})