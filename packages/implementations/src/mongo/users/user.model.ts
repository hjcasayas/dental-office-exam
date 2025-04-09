import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';

import { type UserEntity } from '@dental/features';
import { emailSchema, nameSchema } from '@dental/implementations/zod';

import { validator } from './validators/index.js';

type UserDoc = UserEntity & Document;

interface UserModelImpl extends Model<UserDoc> {
  save: (user: UserEntity) => Promise<void>;
}

const userSchema = new Schema(
  {
    firstName: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
      validate: validator<string>(nameSchema()),
    },
    lastName: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
      validate: validator<string>(nameSchema()),
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: validator<string>(emailSchema()),
    },
    hashedPassword: {
      type: SchemaTypes.String,
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
