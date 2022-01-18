const router = require('express').Router()
const User = require('../models/user.model')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')


router.post('/register', async (req,res) => {
    // validate data before creating user
    const userData = req.body.userData
    const {error} = registerValidation(userData)

    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send('email already exist')

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    
    const user = new User({
        email: userData.email,
        password: hashedPassword,
        username: userData.username
    })

    try{
        const dbRes = await User.create(user)
        res.send({status: 'ok', id: user.id, message: "user has been created!"})

    } catch(err) {
        res.status(400).send(err)
    }

})

router.post('/login', async (req, res) => {
    const userData = req.body.userData
    const {error} = loginValidation(userData)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:userData.email})

    if (!user) return res.status(400).send('Email or password is invalid')

    const validPass = await bcrypt.compare(userData.password, user.password)

    if(!validPass) return res.status(400).send('Invalid password')

    // create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
    let t = new Object(jwt.decode(token))
    // console.log(Date(t['exp']))

    const todoData = user.userTodoList
    const refinedTodoData = todoData.map(todo => {
        return todo.record
    })
  
    res.cookie('id', token, {sameSite: true})
    res.cookie('userId', JSON.stringify(refinedTodoData), {sameSite: true})
    res.redirect(301, '/api/userboard')
})


module.exports = router