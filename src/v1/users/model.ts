import mongoose from 'mongoose';
import validator from 'validator';

import { User } from './interface';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string) {
          return validator.isEmail(value);
        },
        message: 'Email is invalid',
      },
    },
  },
  {
    timestamps: true,
  },
);

export let UserModel: mongoose.Model<User>;

try {
  UserModel = mongoose.model<User>('User');
  // console.log('cached UserModel retrieved');
} catch (error) {
  UserModel = mongoose.model<User>('User', UserSchema);
  // console.log('new UserModel created');
}
