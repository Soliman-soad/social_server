const router = require("express").Router();
const Post =require("../models/Post");
const User = require("../models/User");
const { findById } = require("../models/User");

// create a post

router.post("/",async(req,res)=>{

    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err)
    }
});

// Update a post
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post has been updated");
        }else{
            res.status(403).json("You can update only your post");
        }
    } catch(err){
        res.status(500).json(err);
    }
})

// delete a post

router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        }else{
            res.status(403).json("You can delete only your post");
        }
    } catch(err){
        res.status(500).json(err);
    }
})

// Like a post 
router.put("/:id/like",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("post has been liked");
        }else{
            await post.updateOne({$pull : {likes: req.body.userId}});
            res.status(200).json("post has been disliked")
        }

    }catch(err){
        res.status(500).json(err)
    }
})

// get a post 
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

// get all post
router.get("/timeline/:id", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.params.id);
        const userPosts =await Post.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map((friendsId)=>{
                return Post.find({userId : friendsId});
            })
        );
            res.json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;