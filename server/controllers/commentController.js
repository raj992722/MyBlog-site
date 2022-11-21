const Comment=require('../models/comment');

const createComment= async(req,res)=>{
    const comment= new Comment(req.body);
   try {
    await comment.save();
    res.status(200).json('Commented successfully')
   } catch (error) {
    res.send(500).json(error)
   }
};

const deleteComment= async(req,res)=>{
   try {
    const comment= await Comment.findOne({postId:req.params.id});
    await comment.delete();
    res.status(200).json('Comment deleted successsfully')
   } catch (error) {
    res.status(500).json(error)
   }
};

const getComments= async(req,res)=>{
    try {
       const comment= await Comment.findOne(req.params.id) 
       res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={createComment,deleteComment,getComments}