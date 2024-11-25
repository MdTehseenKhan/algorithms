interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

export function encodeWithHillCipher(text: string, key: Matrix): string {
  validateHillKey(key);

  const normalized = text.replace(/[^A-Z]/g, '').toUpperCase();
  if (normalized.length % 2 !== 0) {
    throw new Error('Text length must be even. Please pad if necessary.');
  }

  let result = '';
  for (let i = 0; i < normalized.length; i += 2) {
    const p1 = normalized.charCodeAt(i) - 65;
    const p2 = normalized.charCodeAt(i + 1) - 65;

    const c1 = modulo(key.a * p1 + key.b * p2, 26);
    const c2 = modulo(key.c * p1 + key.d * p2, 26);

    result += String.fromCharCode(c1 + 65);
    result += String.fromCharCode(c2 + 65);
  }

  return result;
}

export function decodeWithHillCipher(text: string, key: Matrix): string {
  validateHillKey(key);

  const det = modulo(key.a * key.d - key.b * key.c, 26);
  const detInv = modInverse(det, 26);

  const adjKey: Matrix = {
    a: modulo(key.d, 26),
    b: modulo(-key.b, 26),
    c: modulo(-key.c, 26),
    d: modulo(key.a, 26),
  };

  const invKey: Matrix = {
    a: modulo(adjKey.a * detInv, 26),
    b: modulo(adjKey.b * detInv, 26),
    c: modulo(adjKey.c * detInv, 26),
    d: modulo(adjKey.d * detInv, 26),
  };

  return encodeWithHillCipher(text, invKey);
}

function validateHillKey(key: Matrix): void {
  const elements = [key.a, key.b, key.c, key.d];
  for (const element of elements) {
    if (element < 0 || element > 25) {
      throw new Error('Matrix elements must be between 0 and 25');
    }
  }

  const det = modulo(key.a * key.d - key.b * key.c, 26);
  if (det === 0 || gcd(det, 26) !== 1) {
    throw new Error('Matrix is not invertible in modulo 26');
  }
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function modulo(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function modInverse(a: number, m: number): number {
  const normalizedA = modulo(a, m);
  for (let x = 1; x < m; x++) {
    if (modulo(normalizedA * x, m) === 1) return x;
  }
  throw new Error('Modular multiplicative inverse does not exist');
}
