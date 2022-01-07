const router = require('express').Router()
const User = require('../models/user.model')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')


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
        res.json({status: 'ok', user: user})

    } catch(err) {
        res.status(400).send(err)
    }

})


module.exports = router