import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  console.log('object');
  console.log(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
};
