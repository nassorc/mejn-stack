const router = require('express').Router()
const Group = require('../models/group.model')
const {joinGroupValidation} = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/create', async (req, res) => {
    const {groupname, secret} = req.body
    if(!groupname) return res.status(400).json({message: "Must have groupname"})
    if(!secret) return res.status(400).json({message: "Must have password"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(secret, salt)

    const group = new Group({
        groupname: req.body.groupname,
        groupCreatorName: req.body.creator,
        groupSecretKey: hashedPassword
    })
    

    try{
        const dbRes = await Group.create(group)
        res.json({status: 'ok'})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/', async (req, res) => {
    // res.send(req.query)
    // const {error} = joinGroupValidation(req.body)
    // if(error) return res.status(400).send({message: error.details[0].message})
    const groups = await Group.find({groupname:req.query.groupname})
    res.json({status: 'ok', groups: groups})
})
// ?groupname=apple&sor=newest
// :id => home/1234

module.exports = router