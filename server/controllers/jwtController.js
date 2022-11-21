const jwt =require('jsonwebtoken');
// const bcrypt=require("bcrypt");
const Token=require('../models/token');

const isAuthenticated=async(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token)
    res.status(400).json({msg:"Token is missing"})
    jwt.verify(token,process.env.ACCESS_TOKEN,(error,user)=>{
        if(error)
        res.status(400).json({msg:'Token is invalid'})
        req.user=user;
        next();
    })
};

const createNewToken=async(req,res)=>{
    const refreshToken=req.body.token.split(' ')[1];
    if(!refreshToken)
    res.status(400).json({msg:'RefreshToken is missing'})
    const token=await Token.findOne({token:refreshToken});
    if(!token)
    res.status(400).json({msg:"Refresh token is invalid"})
    jwt.verify(token.token,process.env.REFRESH_TOKEN,(error,user)=>{
        if(error)
        res.status(500).json({msg:"Invalid token"})
      const accessToken=  jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:"15m"})
      res.status(200).json({accessToken:accessToken});
    })
}

module.exports={isAuthenticated,createNewToken};