const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    email:{
        type: String,
        require:true,
        max:40,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min:6,
    },
    profilePicture:{
        type: String,
        default:""
    },
    profileCover:{
        type: String,
        default:""
    },
    friend:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc :{
        type: String,
        max: 80
    },
    city:{
        type: String,
        max : 50
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model('User',UserShcema);