// Simplified DES (for educational purposes only - not cryptographically secure)
export function encodeWithDESCipher(text: string, key: string): string {
  const blocks = text.match(/.{1,8}/g) || [];
  let result = '';
  for (const block of blocks) {
    const binary = stringToBinary(block.padEnd(8, ' '));
    const keyBinary = stringToBinary(key.padEnd(8, ' '));
    const encrypted = simpleDESRound(binary, keyBinary);
    result += binaryToString(encrypted);
  }
  return result;
}

export function decodeWithDESCipher(text: string, key: string): string {
  const blocks = text.match(/.{1,8}/g) || [];
  let result = '';
  for (const block of blocks) {
    const binary = stringToBinary(block);
    const keyBinary = stringToBinary(key.padEnd(8, ' '));
    const decrypted = simpleDESRound(binary, keyBinary);
    result += binaryToString(decrypted).trim();
  }
  return result;
}

// Helper functions for simplified DES
function stringToBinary(str: string): string {
  return str
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

function binaryToString(binary: string): string {
  const bytes = binary.match(/.{1,8}/g) || [];
  return bytes
    .map((byte) => String.fromCharCode(Number.parseInt(byte, 2)))
    .join('');
}

function simpleDESRound(data: string, key: string): string {
  // Simple XOR operation for demonstration
  return data
    .split('')
    .map((bit, i) =>
      (Number.parseInt(bit) ^ Number.parseInt(key[i % key.length])).toString()
    )
    .join('');
}
