const express = require('express');
const profile = require('../controllers/profile');
const Post = require('../Models/post')
const User = require('../Models/user')
const frontRoute = express.Router();



frontRoute.get('/',(req,res)=>{
     res.render('Register2')
})
frontRoute.get('/login',(req,res)=>{
    res.render('login')
})

 


frontRoute.get('/Feed2', async (req, res) => {
          try {
            const posts = await Post.find();
            const users = await User.find();
            //console.log(users)

            const postUsers = posts.map(post => {
              const user = users.find(user => user._id.toString() === post.userId.toString());
              return { post, user };
              //console.log(user)
            });
        
            res.render('Feed2', { postUsers });
          } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
          }
});
        
 
 frontRoute.get('/create/:id',(req,res)=>{
    res.render('CreatePost')
 })
 frontRoute.get('/message',(req,res)=>{
   res.render('message')
 })


module.exports = frontRoute;