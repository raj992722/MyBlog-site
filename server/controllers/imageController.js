const Grid=require('gridfs-stream');
const mongoose=require('mongoose');

const url='http://localhost:8000'
let gfs,gfsBucket;
const conn=mongoose.connection
conn.once('open',()=>{
    gfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=Grid(conn.db,mongoose.mongo);
    gfs.collection('fs')
})

const uploadImage= (req,res)=>{
    if(!req.file)
    res.status(404).json('File not found');
    const imageUrl=`${url}/file/${req.file.filename}`
    res.status(200).json(imageUrl)
}

const getImage=async(req,res)=>{
   try{
    const file=await gfs.file.findOne({filename:req.file.filename});
    const readstream=gfsBucket.openDowloadstream(file._id)
    readstream.pipe(res)
   }catch(error){
        res.status(500).json({msg:error.message})
   }
}

module.exports={getImage,uploadImage};