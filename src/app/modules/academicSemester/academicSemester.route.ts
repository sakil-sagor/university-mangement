import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './adademicSemester.controller';
import { AcademicSemesterValidations } from './adademicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const academicSemesteRoutes = router;
