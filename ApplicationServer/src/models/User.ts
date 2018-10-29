import * as mongoose from 'mongoose';
import * as findOrCreate from 'mongoose-findorcreate';

const userSchema : mongoose.Schema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: {type: String, required: false, default: null},
  assigned: {type: Boolean, default: false},
  address: {type: String, required:false},
  // passwordResetToken: {type: String, required: false},
  // passwordResetTokenExpirationDate: {type: Date, required: false}
});

userSchema.methods.name = function() {
  return this.email;
};

userSchema.plugin(findOrCreate);

const User : mongoose.Model<any> = mongoose.model("User", userSchema);

export default User;