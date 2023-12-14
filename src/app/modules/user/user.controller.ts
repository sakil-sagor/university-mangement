import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDb(
      password,
      studentData,
    );
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
