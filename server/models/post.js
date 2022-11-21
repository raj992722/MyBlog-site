const mongoose=require('mongoose');
const {Schema}=mongoose;
const PostSchema=new Schema({
    title:{
        type:String,
        required:"Title required",
        unique:'Title already taken'
    }
    ,
    description:{
        type:String,
        required:"Description required",
    },
    picture:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{type:Date},
    categories:{
        type:Array,
        required:false
    }
});

const Post=mongoose.model("Post",PostSchema);
module.exports={Post};