//test private route
const router = require('express').Router()
const verifyToken = require('./verifyToken')
const Todo = require('../models/todo.model')
const User = require('../models/user.model')

router.post('/user', verifyToken, async (req, res, next) => {
    const todo = req.body.inputValue.todo
    const todoObject = new Todo({record: todo})

    try {
        const dbRes = await User.findOneAndUpdate({
            _id: req.cookies['userIdFind']
        }, {
            $push: {
                userTodoList: todoObject,
            }
        })
    } catch(err) {
        console.log(err)
    }
    // res.send({status: 'ok'})
    
    res.status(200).send({message: 'todo has been added.'})
})


module.exports = router