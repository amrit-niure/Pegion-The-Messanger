import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users' // Reference to the User model
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messages' // Reference to the Message model
  }]
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat
