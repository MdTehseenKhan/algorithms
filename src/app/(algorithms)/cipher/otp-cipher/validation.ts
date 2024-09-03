import { z } from 'zod';

export const otpCipherEncodingFormSchema = z
  .object({
    message: z.string().min(1, 'Message must not be empty'),
    key: z.string().optional(),
    encodedMessage: z.string().optional(),
    decodedMessage: z.string().optional(),
  })
  .refine(
    ({ key, message }) => {
      if (!key) return true;
      if (key.length < message.length * 2) return false;
    },
    {
      message: 'Key must be at least as long as the text (in hex format)',
      path: ['key'],
    }
  );

export type OtpCipherEncodingFormValues = z.infer<
  typeof otpCipherEncodingFormSchema
>;

export const otpCipherDecodingFormSchema = z.object({
  message: z.string().min(1, 'Message must not be empty'),
  key: z.string().min(1, 'Key must not be empty'),
  encodedMessage: z.string().optional(),
  decodedMessage: z.string().optional(),
});

export type OtpCipherDecodingFormValues = z.infer<
  typeof otpCipherDecodingFormSchema
>;
