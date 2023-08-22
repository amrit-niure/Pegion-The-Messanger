import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sessionSchema = new Schema({
  sessionToken: {
    type: String,
    unique: true
  },
  userId: String,
  expires: Date,
});

const Session =   mongoose.models.Session || model('Session', sessionSchema);

export default Session;
