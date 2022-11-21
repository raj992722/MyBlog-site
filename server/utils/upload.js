const multer=require('multer');
const {GridFsStorage}=require('multer-gridfs-storage');

const storage=new GridFsStorage({
    url:"mongodb+srv://rohitraj123:mongodb@rohit123.cfaoeks.mongodb.net/?retryWrites=true&w=majority",
    options:{useNewUrlParser:true},
    file:(req,file)=>{
        const match=['image/png','image/jpg']
        if(match.indexOf(file.memeType)===-1)
        return `${Date.now()}-blog-${file.originalName}`
        return {
            bucketName:'photos',
            filename:`${Date.now()}-blog-${file.originalName}`
        }
    }
})
module.exports=multer({storage:storage})