const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema= new Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required field"
    },
    username:{
        type:String,
        required:"Username is required field",
        unique:"Username already taken"
    },
    password:{
        type:String,
        required:'Password is required field'
    }
})

const User=mongoose.model("User",UserSchema);
module.exports={User};
