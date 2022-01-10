const router = require('express').Router()
const Group = require('../models/group.model')

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

router.post('/join', async (req, res) => {
    const groups = await Group.find({groupname:req.body.groupname})
    res.json({status: 'ok', groups: groups})
})

module.exports = router