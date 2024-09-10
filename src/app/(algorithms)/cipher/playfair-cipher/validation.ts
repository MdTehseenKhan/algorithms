import { z } from 'zod';

export const playfairCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  key: z
    .string()
    .min(1, 'Key must not be empty')
    .regex(/^[A-Za-z]+$/, 'Key must contain only letters'),
  encryptedMessage: z.string().optional(),
  decryptedMessage: z.string().optional(),
});

export type PlayfairCipherFormValues = z.infer<typeof playfairCipherFormSchema>;
