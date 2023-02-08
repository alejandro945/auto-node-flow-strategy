import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  lastname: string;
  createAt?: Date;
  updateAt?: Date;
}
