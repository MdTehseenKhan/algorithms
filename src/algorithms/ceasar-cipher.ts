export function caesarCipher(message: string, shift: number) {
  const shiftAmount = ((shift % 26) + 26) % 26;
  return message.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const isUpperCase = code >= 65 && code <= 90;
    const base = isUpperCase ? 65 : 97;
    return String.fromCharCode(((code - base + shiftAmount) % 26) + base);
  });
}

export function encrypt(message: string, shift: number) {
  return caesarCipher(message, shift);
}

export function decrypt(message: string, shift: number) {
  return caesarCipher(message, -shift);
}
