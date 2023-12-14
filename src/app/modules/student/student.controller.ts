import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
// get single student from db with higher order function
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Student  retrieved successfully',
    data: result,
  });
});

// get all student from db
const getallStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getallStudentFromDb();
  res.status(200).json({
    success: true,
    message: 'Student are retrieved successfully',
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

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getallStudent,
  getSingleStudent,
  deleteStudent,
};
