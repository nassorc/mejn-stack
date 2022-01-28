const mongoose = require('mongoose')
// const todo = require('./todo.model').schema


const validateEmail = (email) => {
    return email
}
const todo = mongoose.Schema({
    record: {type: String, required: true},
    date: {type: Number, required: true, default: Date.now}
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email Address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel'}],
    password: {type: String, required: true},
    userCreatedOn: {type: Number, required: true, default: Date.now()},
    username: {type: String, unique: true, required: true},
    userTodoList: [todo]
})

const model = mongoose.model('UserModel', UserSchema)

module.exports = model