const router = require('express').Router()
const Group = require('../models/group.model')
const {joinGroupValidation} = require('../validation')

router.post('/create', async (req, res) => {
    const group = new Group({
        groupname: req.body.groupname,
        groupCreatorName: req.body.creator,
        groupSecretKey: req.body.secret
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