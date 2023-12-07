import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getallStudent);

router
  .route('/:studentId')
  .get(StudentController.getSingleStudent)
  .delete(StudentController.deleteStudent);

router.post('/create-student', StudentController.createStudent);

export const StudentRoutes = router;
