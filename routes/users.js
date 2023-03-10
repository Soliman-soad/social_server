const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/", (req,res)=>{
    res.send("user server")
})

// update user
router.put("/:id", async(req,res)=>{

    if(req.body.uId === req.params.id || req.body.isAdmin){        
        try{
            const user = await User.findOneAndUpdate({uId : req.params.id},{
                $set: req.body
            });
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only update your account.")
    }

})
// delete user

router.delete("/:id", async(req,res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only delete your account.")
    }

})

// get a user
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.find({uId:req.params.id});
        res.status(200).json(user[0]);
    }catch(err){
        res.status(500).json(err)
    }
})

// follow a user
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id ){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if(!user.friend.includes(req.body.userId)){
                await user.updateOne({$push:{friend :req.body.userId}})
                await currentUser.updateOne({$push: {following : req.params.id}})

                res.status(200).json("user has been follow");
            }else{
                res.status(403).json("You are already added")
            }
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("You can follow yourself")
    }
})

// unfollow a user

router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id ){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if(user.friend.includes(req.body.userId)){
                await user.updateOne({$pull:{friend :req.body.userId}})
                await currentUser.updateOne({$pull: {following : req.params.id}})

                res.status(200).json("user has been unfollow");
            }else{
                res.status(403).json("You are not friend")
            }
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("You can unfollow yourself")
    }
})


// get all user
router.get("/:id/allUser",async(req,res)=>{
    if( (await User.find({uId: req.params.id })).length !==0){
        const users = await User.find({isAdmin : false})
        res.status(200).json(users);
    }
})


module.exports = router