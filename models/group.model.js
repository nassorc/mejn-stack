const mongoose = require('mongoose')
const todo = require('./todo.model').schema 

// To create a group, a user must exist in the database.
// solution: base route should not exist in root server, but 
// after user is validated
const validateUserExistance = (email) => {
    return true
}

const GroupSchema = new mongoose.Schema({
    groupname: {type: String, required: true},
    groupCreatorName: {type: String, required: true},
    groupSecretKey: {type: String, required: true},
    todoList: [{todo}],
    groupCreateOn: {type: Number, default: Date.now()},
})

const model = mongoose.model('GroupModel', GroupSchema)

module.exports = model