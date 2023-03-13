const router = require("express").Router();
const User = require("../models/User");

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
        console.log(req.params.id)
        if(user.length !== 0){
            res.status(200).json(user[0]);
        }else{
            res.status(500).json("data not found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// follow a user
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id ){
        try{
            const user = await User.find({uId :req.params.id});
            const currentUser = await User.find({uId : req.body.userId});
            if(!user[0].friend.includes(req.body.userId)){
                await user[0].updateOne({$push:{friend :req.body.userId}})
                await currentUser[0].updateOne({$push: {following : req.params.id}})
                
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
            const user = await User.find({uId :req.params.id});
            const currentUser = await User.find({uId : req.body.userId});
            
            console.log(user[0].friend)
            console.log(req.body.userId)
            if(user[0].friend.includes(req.body.userId)){
                await user[0].updateOne({$pull:{friend :req.body.userId}})
                await currentUser[0].updateOne({$pull: {following : req.params.id}})

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