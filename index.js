const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();
const Port = process.env.PORT || 8000;
const path = require('path')
//const flash = require('connect-flash');
//const session = require('express-session');


//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
/*app.use(flash());
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  app.use(function(req,res,next){
      res.locals.message = req.flash();
      next()
  })*/
app.set('view engine','ejs')
app.set('views',"views")
/*app.use(function(req, res, next) {
    // set the user object in locals
    res.locals.user = req.user;
    next();
  });*/
//app.use(helmet());
//app.use(morgan());



//routes
app.use(require('./routes/frontRoute'))
app.use(require('./routes/userRoute'))

//Public 
app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.static(path.resolve(__dirname,"public/js")))
app.use(express.static(path.resolve(__dirname,"public/images")))

//DB Connection
const db = require('./Models/connection/connection')




//Listening on Server
app.listen(Port,()=>{
    console.log(`Server Successfully Started at Port ${Port}`);
})