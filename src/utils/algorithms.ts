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
        code: `function polyAlphaCipher(text: string, keys: string[], encode: boolean) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const normalizedKeys = keys.map((key) => key.toUpperCase());

  return text
    .toUpperCase()
    .split('')
    .map((char, i) => {
      if (!alphabet.includes(char)) return char;

      const charIndex = alphabet.indexOf(char);
      const currentKey = normalizedKeys[i % normalizedKeys.length];
      const keyChar = currentKey[i % currentKey.length];
      const keyIndex = alphabet.indexOf(keyChar);

      const newIndex = encode
        ? (charIndex + keyIndex) % 26
        : (charIndex - keyIndex + 26) % 26;

      return alphabet[newIndex];
    })
    .join('');
}

export function encodeWithPolyAlphaCipher(plainText: string, keys: string[]) {
  return polyAlphaCipher(plainText, keys, true);
}

export function decodeWithPolyAlphaCipher(text: string, keys: string[]) {
  return polyAlphaCipher(text, keys, false);
}
`,
      },
    ],
  },
  'otp-cipher': {
    title: 'One-Time Pad Cipher',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus blanditiis sapiente rem sequi optio dignissimos. Nemo, odit quia delectus dignissimos ipsam magnam quis iste consequuntur molestiae voluptas earum molestias alias eius. Impedit architecto vel delectus quis. Repellendus repellat voluptatum ducimus mollitia perspiciatis veniam, quaerat alias sapiente quibusdam delectus et corrupti.',
    worstCase: 'O(n)',
    averageCase: 'O(n)',
    bestCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: `export function encodeWithOtpCipher(text: string, key: string = '') {
  const generatedKey = key || generateKey(text.length);

  if (generatedKey.length < text.length * 2) {
    throw new Error('Key must be at least as long as the text (in hex format)');
  }

  const keyChars = generatedKey
    .match(/../g)!
    .map((hex) => String.fromCharCode(parseInt(hex, 16)))
    .join('');
  const ciphertext = xorStrings(text, keyChars);

  return {
    ciphertext: Array.from(ciphertext, (char) =>
      char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(''),
    key: generatedKey,
  };
}

export function decodeWithOtpCipher(ciphertext: string, key: string) {
  if (key.length < ciphertext.length) {
    throw new Error('Key must be at least as long as the ciphertext');
  }

  const cipherChars = ciphertext
    .match(/../g)!
    .map((hex) => String.fromCharCode(parseInt(hex, 16)))
    .join('');
  const keyChars = key
    .match(/../g)!
    .map((hex) => String.fromCharCode(parseInt(hex, 16)))
    .join('');

  return xorStrings(cipherChars, keyChars);
}

function generateKey(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
  ).join('');
}

function xorStrings(str1: string, str2: string) {
  return str1
    .split('')
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ str2.charCodeAt(i))
    )
    .join('');
}`,
      },
    ],
  },
};
