const mongoose = require('mongoose');

const ConvoSchema = new mongoose.Schema({
    members:{
         type:Array,
    },
    
      

},{timestamps:true})

const Convo = mongoose.model('conversations',ConvoSchema);

module.exports = Convo;