import { z } from 'zod';

const createAcdemicSemesterValidationSchema = z.object({
  body: z.object({
    
  }),
});

export const AcademicSemesterValidations = {
  createAcdemicSemesterValidationSchema,
};
