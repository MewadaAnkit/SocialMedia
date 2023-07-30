
const Convo  = require('../Models/conversation')
const Message = require('../Models/Message')
const messageController = {
      async message(req,res){
             const newMessage = new Message(req.body);
             try {
                 const savedMessage = await newMessage.save();
                 res.status(200).json(savedMessage);
             } catch (err) {
                res.status(500).json(err)
             }
      },
      async conversation(req,res){
            const newConversation = new Convo({
                members:[req.body.senderId , req.body.receiverId]
            })

            try {
                const SavedConvo = await newConversation.save();
                res.status(200).json(SavedConvo);
            } catch (err) {
                res.status(500).json(err)
                
            }
      },
      async getConvo(req,res){
        try{
           const convo = await Convo.find({
            members:{ $in:[req.params.userId],}
           })
           res.status(200).json(convo)
        }catch(err){
            res.status(500).json(err)
        }
      }

}





module.exports = messageController;