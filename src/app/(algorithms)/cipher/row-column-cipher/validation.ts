import { z } from 'zod';

export const rowColumnCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  key: z.coerce
    .number({ required_error: 'Key is required' })
    .positive({ message: 'Key must be greater than 0' }),
  encodedMessage: z.string().optional(),
  decodedMessage: z.string().optional(),
});

export type RowColumnCipherFormValues = z.infer<
  typeof rowColumnCipherFormSchema
>;
