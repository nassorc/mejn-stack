const router = require('express').Router()
const User = require('../models/user.model')

// get user info
router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const todoList = user.userTodoList.map(todo => {
        return {record: todo.record, todoId: todo.id}
    })
    res.status(200).send(JSON.stringify(todoList))
})

//delete root
router.post('/:userId/post/delete', async(req, res) => {
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

    } catch(err) {
        console.log(err)
    }
})

module.exports = router