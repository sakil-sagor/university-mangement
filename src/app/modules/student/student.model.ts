import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { Guardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>(
  {
    firstName: {
      type: String,
      required: [true, 'Name is required'],
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
        message: '{VALUE} is not in capitalization format',
      },
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const guardingSchema = new Schema<Guardian>(
  {
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNo: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherContactNo: { type: String },
  },
  {
    _id: false,
  },
);

const studentSchema = new Schema<Student>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender is required',
      },
    },

    dateOfBrith: { type: String },
    email: { type: String, required: true },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    guardian: guardingSchema,

    prifileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre middleware for hash pasword
studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.pre(['find', 'findOne'], function (next) {
//   this.where({ isDeleted: { $ne: true } });
//   next();
// });

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// after post password will be empty
studentSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const StudentModel = model<Student>('Student', studentSchema);
