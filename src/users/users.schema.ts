import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  avatar: String,
  gender: String,
  uid: String,
  provider: String
});