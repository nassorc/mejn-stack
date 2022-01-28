const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Todo = require('./models/todo.model')
const session = require('express-session')
const flash = require('connect-flash')
var cors = require('cors')

const app = express()

const verifyToken = require('./routes/verifyToken')

// app.use(express.static(path.resolve(__dirname, 'assets')))
app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/src', express.static(__dirname + 'assets/src'))
app.use('/image', express.static(__dirname + 'assets/image'))
app.use(cors())


app.use(favicon(__dirname + '/assets/image/favicon.ico'))

// Parse JSON data middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Set cookie parser, sessions, and flash
app.use(cookieParser('SecretStringForCookies'))
// app.use(session({
//     secret: 'SecretStringForSession',
//     cookie: { maxAge: 6000 },
//     resave: true, // forces sessions to be saved back to the session store
//     saveUninitialized: true 
// }))
// app.use(flash())

// Set view engine
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


if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}


// Route middleware
app.get('/api/user/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const todoList = user.userTodoList.map(todo => {
        return {record: todo.record, todoId: todo.id}
    })
    res.status(200).send(JSON.stringify(todoList))
})
//delete root
app.post('/api/user/:userId/post/delete', async(req, res) => {
    // broken findbyidandupdate
    try{

        const user = await User.findByIdAndUpdate(req.params.userId, 
            {
               "$pull": {
                    "userTodoList": {
                        "_id": req.body.todoId
                    }
                }
            })
            // "userTodoList.$[o].record": "job interview"
                    // "userTodoList.id": req.body.todoId
        console.log(user)
    } catch(err) {
        console.log(err)
    }

})
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


app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

app.listen(PORT, () => {
    console.log('authenticaion server is listening on port 8080')
})