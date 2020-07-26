import mongoose from 'mongoose';

import { connectToDatabase } from './../utils';
import { UserModel } from './../v1/users/model';

const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  name: 'John First',
  email: 'john@first.com',
};

export const setupDatabase = async () => {
  await connectToDatabase();
  await UserModel.deleteMany({});
  await new UserModel(userOne).save();
};

export const closeDatabase = async () => {
  await mongoose.connection.close();
};
