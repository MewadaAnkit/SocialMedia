
const express = require('express');
const registerController = require('../controllers/auth/registerContoller')
const loginController= require('../controllers/auth/loginController')
const router = express.Router();
const session = require('express-session')
//const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');
const profile = require('../controllers/profile');
const followController = require('../controllers/followController');
const unfollowController = require('../controllers/unfollowController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController')
const User = require('../Models/user')
const messageController = require('../controllers/messageController');
router.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));




  
  
  // Logout route
  router.get('/logout', (req, res) => {
    // Clear the user session
    req.session.destroy();
  
    // Redirect to login route
    res.redirect('/login');
  });
  
 
  



// API
router.post('/register',registerController.register)
router.post('/login' , loginController.login)
router.put('/user/:id', userController.update);
router.delete('/userdel/:id', userController.delete);
router.put('/:id/follow', followController.follow)
router.put('/unfollow/:id', unfollowController.unfollow)
router.get('/profile/:id', profile.getUser);


//Post 
router.post('/posts',postController.CreatePost);
router.get('/getpost/:id',postController.getPost)
router.get('/timeline/all',postController.getPostTimeline)

router.put('/posts/:id',postController.UpdatePost);
router.delete('/posts/:id',postController.deletePost);

//Like And Dislike
router.put('/posts/:id/like',likeController.like)

//message
router.post('/conversation' , messageController.conversation)
router.get('/conversation/:userId',messageController.getConvo);

module.exports = router;