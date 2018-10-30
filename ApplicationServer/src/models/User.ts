import * as findOrCreate from 'mongoose-findorcreate';
import {prop, Typegoose, ModelType, InstanceType, plugin} from 'typegoose';

@plugin(findOrCreate)
class User extends Typegoose {

  constructor(){
    super();
  }

  @prop({required: true, unique: true})
  email: String;

  @prop({required: true})
  password: String;

  @prop()
  username: String;

  @prop()
  assigned: Boolean;

  @prop()
  address: String;

  // @prop()
  // passwordResetToken: String;

  // @prop()
  // passwordResetTokenExpirationDate: Date;
}

export default new User().getModelForClass(User);