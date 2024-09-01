import { z } from 'zod';

export const ceasarCipherFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  shift: z.preprocess((val) => Number(val), z.number().min(1).max(26)),
  encryptedMessage: z.string().optional(),
  decryptedMessage: z.string().optional(),
});

export type CeasarCipherFormValues = z.infer<typeof ceasarCipherFormSchema>;
