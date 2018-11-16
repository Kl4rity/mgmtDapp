const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: false},
  ethereumAddressAssigned: {type: Boolean, required: true, default: false},
  ethereumAddress: {type: String, required: false},
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;