import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-porgress', 'blocked'],
      default: 'in-porgress',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre middleware for hash pasword
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

// after post password will be empty
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
