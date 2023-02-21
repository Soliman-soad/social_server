const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    res.send("Register section is activate")
})

// register
router.post("/register", async (req,res)=>{
    
    try{
        // password encrypted 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // user information creating 
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        // save user response
        const user = await newUser.save()
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})





module.exports = router;