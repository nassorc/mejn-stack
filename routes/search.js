const router = require('express').Router()

router.get('/?', (req, res ) => {
    res.send("wanna search something?")
})

module.exports = router