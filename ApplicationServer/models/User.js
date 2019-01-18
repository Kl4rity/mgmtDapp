const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true}
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);