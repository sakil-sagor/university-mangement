import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

import { TUser } from './user.interface';
import { User } from './user.model';

// for create student
const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not giver use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set  manually id
  userData.id = '20231001';
  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
