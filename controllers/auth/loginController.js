const session = require('express-session')
const  bcrypt = require('bcrypt')
const User = require('../../Models/user');
const { CustomErrorHandler } = require("../../services/CustomErrorHandler");
const {JwtService }= require('../../services/JwtServices')
const loginController = {
      async login(req,res,next){
        try {
            const user = await User.findOne({email:req.body.email});
            //console.log(user)

            if(!user){
              res.render('login', { error: 'Invalid credentials. Please try again.' });
              return;
            }
            const match = await bcrypt.compare(req.body.password , user.password);
            if(!match){
              //return next(CustomErrorHandler.WrongCredentials())
              res.render('login', { error: 'Invalid credentials. Please try again.' });
                return;
            }
            
            req.session.userD = user._id;
           const access_token = JwtService.sign({_id:user._id , isAdmin:user.isAdmin})
          
         //res.status(200).json({user:user , msg:"Login Successfully"});
          res.redirect(`/Feed2/userD=${req.session.userD}`);
        //res.redirect('Feed2')
      } catch (err) {
          return next(err)
      }
      }
      
}

module.exports = loginController ;