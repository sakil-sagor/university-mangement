import { z } from 'zod';
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'password can not be more than 20' })
    .optional(),


});

export const UserValidation = {
  userValidationSchema,
};
