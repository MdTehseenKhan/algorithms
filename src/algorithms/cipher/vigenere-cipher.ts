function vigenereCipher(text: string, key: string, encode: boolean) {
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
