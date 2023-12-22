import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './adademicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  console.log('object');
  console.log(req.body);

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
};
