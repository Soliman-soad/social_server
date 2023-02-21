const router = require("express").Router();
const Post =require("../models/Post");
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

// Like a post 

// get a post 

// get all post


module.exports = router;