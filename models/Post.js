const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(

    {
        userId:{
            type: String,
            require: true
        },
        image:{
            type: String,            
        },
        desc:{
            type: String,
            max: 800
        },
        likes:{
            type: Array,
            default: []
        },
        comments:{
            type: Array,
            default:[]
        }
    },
    {
        timestamps: true
    }

)

module.exports = mongoose.model("Post", PostSchema);