const User = require('../Models/user')
const Post = require('../Models/post')
const profile = {
  async getUser(req, res) {
    try {

      const userId = req.params.id;
      const user = await User.findById(req.params.id);
        const posts = await Post.find({ userId: userId });
   
      res.render('UserProfile', { user:user , posts:posts});
      
    } catch (err) {
      res.send(err)
    }
  }
}


module.exports = profile;