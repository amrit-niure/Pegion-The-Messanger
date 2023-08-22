import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'         
  }],
  messages: [messageSchema]
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
const Message = mongoose.models.Message ||  mongoose.model('Message', messageSchema);

export {Room, Message}


