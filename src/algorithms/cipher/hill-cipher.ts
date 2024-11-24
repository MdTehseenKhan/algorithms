interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

export function encodeWithHillCipher(text: string, key: Matrix): string {
  const normalized = text.replace(/[^A-Z]/g, '').toUpperCase();
  if (normalized.length % 2 !== 0) throw new Error('Text length must be even');

  let result = '';
  for (let i = 0; i < normalized.length; i += 2) {
    const p1 = normalized.charCodeAt(i) - 65;
    const p2 = normalized.charCodeAt(i + 1) - 65;

    const c1 = (key.a * p1 + key.b * p2) % 26;
    const c2 = (key.c * p1 + key.d * p2) % 26;

    result += String.fromCharCode(c1 + 65);
    result += String.fromCharCode(c2 + 65);
  }

  return result;
}

export function decodeWithHillCipher(text: string, key: Matrix): string {
  const determinant = (key.a * key.d - key.b * key.c) % 26;
  const determinantInv = modInverse(determinant, 26);

  const adjKey: Matrix = {
    a: key.d,
    b: -key.b,
    c: -key.c,
    d: key.a,
  };

  const inverseKey: Matrix = {
    a: (adjKey.a * determinantInv) % 26,
    b: (adjKey.b * determinantInv) % 26,
    c: (adjKey.c * determinantInv) % 26,
    d: (adjKey.d * determinantInv) % 26,
  };

  return encodeWithHillCipher(text, inverseKey);
}

function modInverse(a: number, m: number): number {
  const normalizedA = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((normalizedA * x) % m === 1) return x;
  }
  throw new Error('Modular multiplicative inverse does not exist');
}
