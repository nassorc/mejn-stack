const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    groupId: {},
    userId: {},
    todoList: {},
    groupCreateOn: {},
    groupname: {},
    groupSecretKey: {}
})

const model = mongoose.model('GroupModel', GroupSchema)

module.exports = model