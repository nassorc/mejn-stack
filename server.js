const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const Todo = require('./models/todo.model')


const mongoose = require('mongoose')
// establish connection with mongdb community server
// mongodb:// is a custom protocol
// remove port because we are using default port
mongoose.connect('mongodb://localhost/todo-database')

// mongoose will still proceed with its operations without 
// establishing a connection.
// mongoose queus the operations.

app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyParser.json())

app.post('/api/create', async (req,res) => {
    const record = req.body
    // creating/inserting a new record in the database (C rud)
    //accepts json object
    // there is also a response from the mongoDB database server
    try{
        console.log(record)
        const dbRes = await Todo.create(record)
        console.log('database response= ', dbRes)
    } catch(err) {console.log(err)}


    res.json({status: 'ok', data: record})
})

// reading from the operations (c R ud)
app.get('/api/get', async (req, res) => {
    // find element using {} to match a certain criteria
    const records = await Todo.find({})
    res.json(records)
})

app.post('/api/modify', async (req, res) => {
    const {o, n} = req.body
    
    // first argument is the query we want to select and update
    // new object for the second parameter
    // if we don't add $set we will rewrite the whole document and 
    // erase the other data. so the data in $set will be merged with
    // the existing document.
    const dbRes = await Todo.updateOne(
        {
            record: o
        },
        {
            $set: {
                record: n
            }
        }
    )
    console.log(dbRes)
    
    res.json({status: 'ok', message: 'request for modifcation was received'})
})

// delete a record
app.post('/api/delete', async (req, res) => {
    const {record} = req.body
    console.log(record)

    const dbRes = await Todo.deleteOne({ record })
    console.log(dbRes)
    res.json({status: 'ok', message: 'the todo was deleted'})
})

app.listen(13371, () => {
    console.log('server is up')
})