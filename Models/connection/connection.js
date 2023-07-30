const mongoose = require('mongoose');
const { DB } = require('../../config')

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{

    console.log("Successfully connected to Database");

}).catch((err)=>console.log(err));


module.exports = require;