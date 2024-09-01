import { z } from 'zod';

export const vigenereCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  key: z
    .string()
    .min(1, 'Key must not be empty')
    .regex(/^[A-Za-z]+$/, 'Key must contain only letters'),
  encodedMessage: z.string().optional(),
  decodedMessage: z.string().optional(),
});

export type VigenereCipherFormValues = z.infer<typeof vigenereCipherFormSchema>;
