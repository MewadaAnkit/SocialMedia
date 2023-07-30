const Post = require('../Models/post');
const User = require('../Models/user')
const postController = {
    async CreatePost(req,res){
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost)
            
        } catch (err) {
              res.status(500).json(err)
        }

    },

    async UpdatePost(req,res){
        try{
          const posts = await Post.findById(req.params.id);
          if(posts.userId === req.body.userId){
               await posts.updateOne({$set:req.body});
               res.status(200).json('Updated Successfully')
          }else{
                 res.status(403).json('Cannot update posts')
          }
        }catch(err){
                 res.status(500).json(err)
        }
    },

    async deletePost(req,res){
        try{
          const posts = await Post.findById(req.params.id);
          if(posts.userId === req.body.userId){
               await posts.deleteOne();
               res.status(200).json('deleted  Successfully')
          }else{
                 res.status(403).json('Cannot Delete posts')
          }
        }catch(err){
                 res.status(500).json(err)
        }
    }
    ,
    async getPost(req,res){
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getPostTimeline(req,res){
        try {
            const currentUser = await User.findById(req.body.userId)
            const userPosts = await Post.find({userId:currentUser._id});
            const friends = await Promise.all(
                currentUser.following.map((friendId)=>{
                    return Post.find({userId:friendId});
                })
            );
            res.status(200).json(userPosts.concat(...friends));
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = postController