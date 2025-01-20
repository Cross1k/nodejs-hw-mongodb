import { model, Schema } from 'mongoose';
import { EMAIL_REGEXP } from '../../constants/index.js';

const userSchema = new Schema(
  {
    name: { type: String, requried: true },
    email: { type: String, match: EMAIL_REGEXP, unique: true, requried: true },
    password: { type: String, minLength: 6, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('user', userSchema);
