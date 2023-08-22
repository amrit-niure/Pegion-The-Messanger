import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const accountSchema = new Schema({
  userId: String,
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const Account = model('Account', accountSchema);

export default Account;
