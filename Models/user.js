const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    username:{
          type:String,
          required:true,
          unique:true
    },
    email:{
         type:String,
         required:true,
         unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    Profile:{
        type:String,
        default:"",
    },
    followers:{
         type:Array,
         default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
         type:Boolean,
         default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
       enum:[1,2,3]    
    }
    
      

},{timestamps:true})

const User = mongoose.model('UsersSocial',UserSchema);

module.exports = User;