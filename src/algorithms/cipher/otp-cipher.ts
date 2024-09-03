export function encodeWithOtpCipher(text: string, key: string = '') {
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
}

// import { randomBytes } from 'crypto';

// export function encodeWIthOtpCipher(text: string, key?: string) {
//   const textBuffer = Buffer.from(text, 'utf-8');
//   const generatedKey = key || generateKey(textBuffer.length);
//   const keyBuffer = Buffer.from(generatedKey, 'hex');

//   if (keyBuffer.length < textBuffer.length) {
//     throw new Error('Key must be at least as long as the text');
//   }

//   const cipherBuffer = xorBuffers(textBuffer, keyBuffer);

//   return {
//     ciphertext: cipherBuffer.toString('hex'),
//     key: generatedKey,
//   };
// }

// export function decodeWithOtpCipher(text: string, key: string) {
//   const cipherBuffer = Buffer.from(text, 'hex');
//   const keyBuffer = Buffer.from(key, 'hex');

//   if (keyBuffer.length < cipherBuffer.length) {
//     throw new Error('Key must be at least as long as the ciphertext');
//   }

//   const textBuffer = xorBuffers(cipherBuffer, keyBuffer);

//   return textBuffer.toString('utf-8');
// }

// function generateKey(length: number) {
//   return randomBytes(length).toString('hex');
// }

// function xorBuffers(buffer1: Buffer, buffer2: Buffer) {
//   return Buffer.from(buffer1.map((byte, i) => byte ^ buffer2[i]));
// }
