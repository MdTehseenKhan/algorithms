import { z } from 'zod';

const numSchema = z.coerce
  .number({ required_error: 'This field is required' })
  .positive({ message: 'Must be greater than 0' });

export const hillCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  a: numSchema,
  b: numSchema,
  c: numSchema,
  d: numSchema,
  encodedMessage: z.string().optional(),
  decodedMessage: z.string().optional(),
});

export type HillCipherFormValues = z.infer<typeof hillCipherFormSchema>;
