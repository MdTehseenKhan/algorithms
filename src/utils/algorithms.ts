import { ProgrammingLanguage } from '@/types/language';

export interface AlgorithmCode {
  language: ProgrammingLanguage;
  code: string;
}

export interface Algorithm {
  title: string;
  description: string;
  worstCase: string;
  averageCase: string;
  bestCase: string;
  codes: AlgorithmCode[];
}

export const algorithms: Record<string, Algorithm> = {
  'ceasar-cipher': {
    title: 'Ceasar Cipher',
    description:
      'The Caesar cipher is a simple substitution cipher that shifts each letter in the alphabet by a fixed number of positions. For example, with a shift of 1, A would be replaced by B, B would become C, and so on. The Caesar cipher is named after Julius Caesar, who used it to communicate with his generals.',
    worstCase: 'O(n)',
    averageCase: 'O(n)',
    bestCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: `function caesarCipher(message: string, shift: number) {
  const shiftAmount = ((shift % 26) + 26) % 26;
  const result = message.replace(/[a-zA-Z0-9]/g, (char) => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    return String.fromCharCode(((code - base + shiftAmount) % 26) + base);
  });
  return result;
}

export function encryptWithCaesarCipher(message: string, shift: number) {
  return caesarCipher(message, shift);
}

export function decryptWithCaesarCipher(message: string, shift: number) {
  return caesarCipher(message, -shift);
}`,
      },
    ],
  },
  'vigenere-cipher': {
    title: 'Vigenere Cipher',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus blanditiis sapiente rem sequi optio dignissimos. Nemo, odit quia delectus dignissimos ipsam magnam quis iste consequuntur molestiae voluptas earum molestias alias eius. Impedit architecto vel delectus quis. Repellendus repellat voluptatum ducimus mollitia perspiciatis veniam, quaerat alias sapiente quibusdam delectus et corrupti.',
    worstCase: 'O(n)',
    averageCase: 'O(n)',
    bestCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: `function vigenereCipher(text: string, key: string, encode: boolean) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');

  const result = text
    .toUpperCase()
    .split('')
    .map((char, i) => {
      if (!alphabet.includes(char)) return char;

      const charIndex = alphabet.indexOf(char);
      const keyChar = normalizedKey[i % normalizedKey.length];
      const keyIndex = alphabet.indexOf(keyChar);

      const newIndex = encode
        ? (charIndex + keyIndex) % 26
        : (charIndex - keyIndex + 26) % 26;

      return alphabet[newIndex];
    })
    .join('');

  return result;
}

export function encodeWithVigenereCipher(plainText: string, key: string) {
  return vigenereCipher(plainText, key, true);
}

export function decodeWithVigenereCipher(cipherText: string, key: string) {
  return vigenereCipher(cipherText, key, false);
}
`,
      },
    ],
  },
  'poly-alpha-cipher': {
    title: 'Poly-Alpha Cipher',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus blanditiis sapiente rem sequi optio dignissimos. Nemo, odit quia delectus dignissimos ipsam magnam quis iste consequuntur molestiae voluptas earum molestias alias eius. Impedit architecto vel delectus quis. Repellendus repellat voluptatum ducimus mollitia perspiciatis veniam, quaerat alias sapiente quibusdam delectus et corrupti.',
    worstCase: 'O(n)',
    averageCase: 'O(n)',
    bestCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: ``,
      },
    ],
  },
};
