import { Request } from 'express';
import { utc } from 'moment';
import Multer from '../config/uploads/multer';
import { IUser } from '../interfaces/user';
import userModel from '../models/user.model';

class UserController {
  // Create new User
  async save(cliente: IUser) {
    const dataUser = {
      ...cliente,
      createAt: utc().toDate(),
      updateAt: utc().toDate(),
    };
    const result = await userModel.create(dataUser);
    return { _id: result._id };
  }

  // List of users
  async list() {
    const result: IUser[] | null = await userModel.find();
    return result;
  }

  async uploadImage(req: Request, res: any) {
    const multer = new Multer('upload', 'image');
    const upload = multer.init();
    upload(req, res, (err: any) => {
      console.log(err);
    });
  }
}

export default new UserController();
