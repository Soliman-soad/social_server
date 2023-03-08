const User = require("../models/User");
const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("Register section is activate")
})

// register
router.post("/register", async (req,res)=>{
    
    try{        
        // user information creating 
        const newUser = new User({
            singleUserData: req.body.singleUserData,
            uId: req.body.uId,
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
        // user uId checking 
        const user = await User.findOne({uId: req.body.uId});
        !user && res.status(404).json("user not found");

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})





module.exports = router;