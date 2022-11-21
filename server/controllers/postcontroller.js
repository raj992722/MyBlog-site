const Post=require('../models/post');

const createPost=  async(req,res)=>{
 try {
    const post= new Post(req.body);
    await post.save();
    res.status(200).json('Post created successfully');
    
 } catch (error) {
    res.status(500).json(error);
 }
}

const updatePost= async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post)
    res.status(404).json({msg:"Post not found"})
    try {
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json('Post updated successfully')
    } catch(error) {
        res.status(500).json(error)
    }
};
const deletePost= async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        await post.delete();
        res.status(200).json('Post deleted successfully');
    } catch (error) {
        res.status(500).json(error)
    }
};

const getPost=async (req,res)=>{
   try {
    const post=await Post.findById(req.params.id);
    if(!post)
    res.status(404).json("post not found");
    res.status(200).json(post);
   } catch (error) {
    res.status(500).json(error)
   }
};

const getAllPosts=async(req,res)=>{
    try {
        const username=req.query.username;
        const category=req.query.category;
        let posts;
        if(username)
        posts= await Post.find({username:username});
        else if(category)
        posts= await Post.find({categories:category});
        else
        posts=await Post.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={createPost,deletePost,updatePost,getPost,getAllPosts}