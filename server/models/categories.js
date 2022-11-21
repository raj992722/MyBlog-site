
const mongoose=require('mongoose');
const {Schema}=mongoose;

const CategoriesSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})

const Category=mongoose.model("Category",CategoriesSchema);
module.exports = {Category};