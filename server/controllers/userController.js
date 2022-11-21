const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();
const User=require('../models/user')
const Token=require('../models/token')
const users=[]
const createUser= async (req,res)=>{
    try{
         const hashedPassword= await bcrypt.hash(req.body.password,10);
         const user={name:req.body.name,username:req.body.username,password:hashedPassword};
        //  const newUser=new User(user);
        //  await newUser.save();
        users.push(user.name)
         res.status(201).json({msg:"succesfully signed up"},users)
    }catch(err){
            res.status(401).json({msg:'something'})
    }

};

const signin= async(req,res)=>{
    try {
        const user= await User.find({username:req.body.username});
        if(!user)
        res.status(404).send('Username does`nt exist');
        if(await bcrypt.compare(req.body.password,user.password)){
            const accesstoken=jwt.sign(user.username.toJSON(),process.env.ACCESS_TOKEN,{expiresIn:'15m'});
            const refreshtoken=jwt.sign(user.username.toJSON(),process.env.REFRESH_ACCESS_TOKEN);
            
            const newToken=new Token({token:refreshtoken});
            await newToken.save();
            res.status(200).json({accesstoken:accesstoken,refreshtoken:refreshtoken,name:user.name,username:user.username})
        }else{
            res.status(404).json({msg:'password do not match'})
        }
    } catch (error) {
        res.status(500).json({msg:'Something goes wrong'})
    }

};
const logoutUser=async (req,res)=>{
    const token=await Token.deleteOne(req.body.token);
    await token.delete();
    res.status(200).json("Logout successfully");
}

module.exports={signin,createUser,logoutUser}