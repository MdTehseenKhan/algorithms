import { z } from 'zod';

export const railFenceCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  rails: z.coerce
    .number({ required_error: 'Rails is required' })
    .positive({ message: 'Rails must be greater than 0' }),
  encodedMessage: z.string().optional(),
  decodedMessage: z.string().optional(),
});

export type RailFenceCipherFormValues = z.infer<
  typeof railFenceCipherFormSchema
>;
