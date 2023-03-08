const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
    singleUserData:{
        type: Object,
        required: true
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
        max : 50,
        default:""
    },
    uId:{
        type: String,
        default:""
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model('User',UserShcema);