import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

// get single student from db with higher order function
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

// get all student from db
const getallStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getallStudentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

// get single student from db
// const getSingleStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const { studentId } = req.params;
//     const result = await StudentServices.getSingleStudentFromDb(studentId);

//     res.status(200).json({
//       success: true,
//       message: 'Student  retrieved successfully',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// delete single student

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const StudentController = {
  getallStudent,
  getSingleStudent,
  deleteStudent,
};
