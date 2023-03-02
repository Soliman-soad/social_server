const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

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
            email: req.body.email,
            city: req.body.city
        });

        // save user response
        const user = await newUser.save()
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

// login
router.post('/login', async(req,res)=>{
    try{
        // user email checking 
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");

        // password checking
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("password is invalid")

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})





module.exports = router;