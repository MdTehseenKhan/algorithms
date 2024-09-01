function polyAlphaCipher(text: string, keys: string[], encode: boolean) {
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
