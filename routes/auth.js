const router = require('express').Router()
const User = require('../models/user.model')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

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

    const testUser = {email: 'mat@gmail.com', password: 'test123'}

    // fs.readFile(path.join(__dirname, '..', 'assets/user.ejs'), 'utf-8', (err, html) => {
    //     console.log(html)
    //     res.header('auth-token', token).render(ejs.render(html, {objj}))
    // })  
    // res.header('auth-token', token).send(ejs.render(path.join(__dirname, '..', 'assets/user.html'), JSON.stringify(req.body)))
    res.render('user', testUser)

})


module.exports = router