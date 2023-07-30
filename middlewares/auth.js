const { JwtService } = require("../services/JwtServices");
const { CustomErrorHandler } = require("../services/CustomErrorHandler");
const auth = async(req,res,next) =>{
    let authHeader = req.headers.authorization
    
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized())
    }

    const token = authHeader.split(' ')[1];
    
    try {
        
         const {_id , isAdmin} = await JwtService.verify(token)
          const user = {
             _id,
             isAdmin
          }
          req.user = user
          next();
    } catch (err) {
         return next(CustomErrorHandler.notFound);
    }

}

module.exports = auth;