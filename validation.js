// validation 
const Joi = require('joi')

// register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        username: Joi.string().required()
    })

    // validate data before creating user
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    // validate data before creating user
    return schema.validate(data)
}

const joinGroupValidation = (data) => {
    const schema = Joi.object({
        groupname: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = {registerValidation, loginValidation, joinGroupValidation}

