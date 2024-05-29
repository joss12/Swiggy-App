import * as mongoose from "mongoose";
import { model } from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  email_verified: {
    type: String,
    required: true,
    default:false
  },
  verification_token:{
    type:String,
    required: true
  },
  verification_token_time:{
    type:Date,
    require: true
  },
  phone: {
    type: String,
    required: true,
  },
  photo:{
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  reset_password_token:{
    type:String,
    required: false
  },
  reset_password_token_time:{
    type:Date,
    require: false
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // uuid:[{type:String}],
  created_at: { type: Date, required: true, default: new Date().toString()},
  updated_at: { type: Date, required: true, default: new Date() },

});

export default model("User", userSchema);
