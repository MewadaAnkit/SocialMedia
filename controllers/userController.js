const bcrypt = require('bcrypt')
const User = require('../Models/user')
const userController = {

   //update Profile 
   async update(req,res,next){
              if(req.body.userId == req.params.id || req.user.isAdmin){
                   if(req.body.password){
                     try {
                        req.body.password = await bcrypt.hash(req.body.password , 10)
                     } catch (err) {
                         return res.status(500).json(err);
                     }
                   }
                   
                  try {
                        const user = await User.findByIdAndUpdate(req.params.id,{
                           $set:req.body,
                        });

                        res.status(200).json('Account has been updated')
                     
                  } catch (err) {
                     return res.status(500).json(err);
                  }


            }
              else{
                      return res.status(403).json("You can only update your informations")
              }
   },







   //Delete User
   async delete(req,res){
      if(req.body.userId == req.params.id || req.body.isAdmin){
        try {
              const user = await User.findByIdAndDelete(req.params.id);

              res.status(200).json('Account has been Deleted')
           
        } catch (err) {
           return res.status(500).json(err);
        }


  }
    else{
            return res.status(403).json("You can only Delete your informations")
    }
   },



   // get User 
   


}

module.exports = userController;