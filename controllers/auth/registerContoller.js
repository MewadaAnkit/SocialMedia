const User = require('../../Models/user')
const bcrypt = require('bcrypt');
const joi = require('joi')
const registerController = {
     async register(req, res, next) {
          const registerSchema = joi.object({
               username: joi.string().min(3).max(30).required(),
               email: joi.string().email().required(),
               password: joi.string().min(6).required(),
               repeat_password:joi.ref('password')
               
             });
           
             const { error } = await registerSchema.validate(req.body);
           
             if (error) {
               const errorMessages = error.details.map((error) => error.message);
                   res.render('Register2', { errors: errorMessages });
             }
           
             

          try {

               const hashedpassword = await bcrypt.hash(req.body.password, 10)

               const { username, email } = req.body;
               const newUser = await new User({
                    username: username,
                    email: email,
                    password: hashedpassword,
               });

               /*const user1 = await User.findOne({email:email});

               if(user1){
                    res.render('Register2',{errormsg:"User already exist"})
               }*/
               const user = await newUser.save()
               console.log(user)
               //res.status(200).json(user)
               res.render('login',{message:"Registraiton Successful Now Login "})

          } catch (error) {
              return next(error)
          }

     }
}

module.exports = registerController;