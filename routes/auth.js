const router = require('express').Router()
const User = require('../models/user.model')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res) => {
    // validate data before creating user
    const {error} = registerValidation(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send('email already exist')

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
    })


    try{
        const dbRes = await User.create(user)
        res.json({status: 'ok', id: user.id})

    } catch(err) {
        res.status(400).send(err)
    }

})

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Email or password is invalid')

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(!validPass) return res.status(400).send('Invalid password')

    // create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
    let t = new Object(jwt.decode(token))
    console.log(Date(t['exp']))
    res.header('auth-token', token).send(token)

})


module.exports = router