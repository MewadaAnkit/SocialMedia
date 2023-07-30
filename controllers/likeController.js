const Post = require('../Models/post');

const likeController = {
     async like(req,res){
         try {
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                 await post.updateOne({$push:{likes:req.body.userId}});
                 res.status(200).json("The Post has been Liked ");
            }else{
                await post.updateOne({$pull:{likes:req.body.userId}});
                 res.status(200).json("The Post has been Disliked ");
            }
         } catch (err){
             res.status(500).json(err)
         }
     }
}

module.exports = likeController