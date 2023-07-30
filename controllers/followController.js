const User = require('../Models/user');

const followController = {
    async follow(req,res){
       // if(req.body.userId !== req.params.id){
         try {

                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId)
                if(!user.followers.includes(req.body.userId)){
                   await user.updateOne({$push:{followers:req.body.userId}})
                   await currentUser.updateOne({$push:{following:req.params.id}})
                   res.status(200).json('User Has been followed successfully')

                }
                else{
                    res.status(403).json('you cannot follow yourself')
                }



                
                
         }catch (err) {
                  res.send('someEror')
                //res.status(500).json(err)
          }

        //}else{
        //    res.status(403).json('you cannot follow yourself ')
        //}
    }
}
module.exports = followController;