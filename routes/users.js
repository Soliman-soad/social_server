const router = require("express").Router();

router.get('/',(req,res)=>{
    res.send("user server added")
})

module.exports = router