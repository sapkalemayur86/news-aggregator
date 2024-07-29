const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: { type: Array, default: [] }
  });


const UserModel =mongoose.model("users",userSchema);

module.exports = UserModel;