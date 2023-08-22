import mongoose from 'mongoose'

const chatUserSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }],
    friendRequests: {
        type: Number,
        default: null
    },
});

const ChatUser = mongoose.models.ChatUser || mongoose.model('ChatUser', chatUserSchema)

export default ChatUser
