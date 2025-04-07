import type { UserEntity } from '@dental/features';
import { Document, Model, model, Schema } from 'mongoose';

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
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
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
