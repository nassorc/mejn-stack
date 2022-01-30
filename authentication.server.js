const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const groupRoute = require('./routes/group')
const userRoute = require('./routes/user')
const searchRoute = require('./routes/search')

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080 
const verifyToken = require('./routes/verifyToken')

// app.use(express.static(path.resolve(__dirname, 'assets')))
app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/src', express.static(__dirname + 'assets/src'))
app.use('/image', express.static(__dirname + 'assets/image'))

// Parse JSON data middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Set cookie parser, sessions, and flash
app.use(cookieParser('SecretStringForCookies'))

// Set view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

connectDB()

// logger setup
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// Route middleware
app.use('/api/user', authRoute, userRoute, (req, res) => {
    // login and register page
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
app.use('/g', groupRoute)
app.use('/search', searchRoute)
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

app.listen(PORT, () => {
    console.log('authenticaion server is listening on port 8080')
})