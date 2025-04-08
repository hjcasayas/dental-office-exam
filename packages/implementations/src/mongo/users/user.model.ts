import { Document, Model, model, Schema } from 'mongoose';

import { type UserEntity } from '@dental/features';
import { emailSchema, nameSchema } from '@dental/implementations/zod';

import { validator } from './validators/index.js';

interface UserModelImpl extends Model<UserEntity> {
  save: (user: UserEntity) => Promise<void>;
}

type UserDoc = UserEntity & Document;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: validator<string>(nameSchema()),
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: validator<string>(nameSchema()),
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: validator<string>(emailSchema()),
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.save = async (user: UserEntity): Promise<void> => {
  await UserModel.create(user);
};

const UserModel = model<UserDoc, UserModelImpl>('User', userSchema);

export { UserModel };
