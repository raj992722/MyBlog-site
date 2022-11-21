
const express=require('express');
const router=express.Router();
const f=require('../controllers/userController');
const p=require('../controllers/postcontroller')
const t=require('../controllers/jwtController')
const c=require('../controllers/commentController');
const i=require('../controllers/imageController')

const upload=require('../utils/upload')

router.use((req,res,next)=>{
    req.params= req.params || ""
    next()
})

router.post("/sigin",f.createUser);



module.exports={router};