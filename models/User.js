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
    followers:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model('User',UserShcema);