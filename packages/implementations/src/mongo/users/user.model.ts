import type { UserEntity } from '@dental/features';
import { Document, Model, model, Schema } from 'mongoose';

interface UserModelImpl extends Model<UserEntity> {
  build: (user: UserEntity) => typeof UserModel;
}

type UserDoc = UserEntity & Document;

const userSchema = new Schema({
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
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    default: new Date(),
  },
});

userSchema.statics.build = (user: UserEntity) => {
  return new UserModel(user);
};

userSchema.pre('save', function () {
  if (!this.isNew) {
    this.set('updatedDate', new Date());
  }
});

const UserModel = model<UserDoc, UserModelImpl>('User', userSchema);

export { UserModel };
