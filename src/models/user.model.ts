import { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date },
});

const userModel: Model<IUser> = model('user', userSchema);
export default userModel;
