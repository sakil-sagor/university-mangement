import { Types } from 'mongoose';
import { StudentModel } from './student.model';

// get all of students
const getallStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};
// get single student
const getSingleStudentFromDb = async (studentId: string) => {
  // const result = await StudentModel.findOne({ _id: studentId });
  const result = await StudentModel.aggregate([
    { $match: { _id: new Types.ObjectId(studentId) } },
  ]);

  return result;
};
// delete student but it is update
const deleteStudentFromDb = async (studentId: string) => {
  const result = await StudentModel.updateOne(
    { _id: studentId },
    { isDeleted: true },
  );
  return result;
};

export const StudentServices = {
  getallStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
