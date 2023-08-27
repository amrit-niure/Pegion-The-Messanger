import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  content: {
    type: String,
    required: true
  },
},{
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Messages = mongoose.models.Messages || mongoose.model('Messages', messageSchema);
export default Messages