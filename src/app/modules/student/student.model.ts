import { Schema, model } from 'mongoose';
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
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: 'User',
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

export const StudentModel = model<Student>('Student', studentSchema);