import * as mongoose from 'mongoose';
import * as findOrCreate from 'mongoose-findorcreate';

class userSchemaClass extends mongoose.Schema {
  constructor(definition? : mongoose.SchemaDefinition, options? : mongoose.SchemaOptions){
    super(definition, options);
  }
}

const userSchema : mongoose.Schema = new mongoose.Schema({
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

const User : mongoose.Model<any> = mongoose.model("User", userSchema);

export default User;