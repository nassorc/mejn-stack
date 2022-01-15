//test private route
const router = require('express').Router()
const verifyToken = require('./verifyToken')
const Todo = require('../models/todo.model')
const User = require('../models/user.model')

router.post('/user', verifyToken, async (req, res, next) => {
    const todo = req.body.inputValue.todo

    const todoObject = new Todo({record: todo})
    console.log(todoObject)
    try {
        const dbRes = await User.findOneAndUpdate({
            _id: req.cookies['userId']
        }, {
            $push: {
                userTodoList: todoObject,
            }
        })
        console.log(dbRes)
        next()
    } catch(err) {
        console.log(err)
        next()
    }
    res.json({status: 'ok'})
})
// router.get('/user', verifyToken, async (req, res, next) => {
//     // console.log('GET')
//     // try {
//     //     const dbRes = await User.findOne({_id: req.cookies['userId']})
//     //     const todo = dbRes.userTodoList[0]
//     //     console.log(todo)
//     // } catch(err) {
//     //     console.log(err)
//     // }
//     res.json({status: 'ok'})
// }) 


module.exports = router