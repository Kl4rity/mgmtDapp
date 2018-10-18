const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: {type: String, required: false, default: null},
  assigned: {type: Boolean, default: false},
  address: {type: String, required:false, default: "0x0000000000000000000000000000000000000000"}
});

userSchema.methods.name = function() {
  return this.email;
};

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;