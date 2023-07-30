const User = require('../Models/user');

const unfollowController = {
    async unfollow(req,res){
        if(req.body.userId !== req.params.id){
            try {

                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId)
                if(user.followers.includes(req.body.userId)){
                   await user.updateOne({$pull:{followers:req.body.userId}})
                   await currentUser.updateOne({$pull:{following:req.params.id}})
                
                   res.status(200).json('User Has been unfollowed ')

                }
                else{
                    res.status(403).json('you cannot unfollow yourself')
                }
                
            }catch (err) {
                res.status(500).json(err)
            }

        }else{
            res.status(403).json('you cannot follow yourself ')
        }
    }
}
module.exports = unfollowController;