const mongoose = require('mongoose')


const validateEmail = (email) => {
    return email
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email Address is required',
        validate: [validateEmail, 'Please fill a valid email address'],

    },
    password: {type: String, required: true},
    userCreatedOn: {type: Number, required: true, default: Date.now()},
    username: {type: String, unique: true, required: true},
})

const model = mongoose.model('UserModel', UserSchema)

module.exports = model