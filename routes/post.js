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
        console.log(dbRes)
    } catch(err) {
        console.log(err)
    }
    // res.send({status: 'ok'})
    
    res.status(200).send({message: 'todo has been added.'})
})
// router.get('/user/get', verifyToken, async (req, res, next) => {
//     console.log('GET')
//     try {
//         const dbRes = await User.findOne({_id: req.cookies['userId']})
//         const todo = dbRes.userTodoList[0]
//         console.log(todo)
//     } catch(err) {
//         console.log(err)
//     }
//     res.send({status: 'ok', message: 'data'})
// }) 
            
router.get('/user/get', verifyToken, (req, res, next) => {
    console.log('get /user been triggered')
    res.send({message: 'data'})
})

module.exports = router