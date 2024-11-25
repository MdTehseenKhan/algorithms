import type { ProgrammingLanguage } from '@/types/language';

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
    description: `The Caesar cipher is one of the simplest and oldest known encryption techniques. It works by shifting each letter in the plaintext a fixed number of positions down the alphabet. Here's how it operates: Choose a shift value (often called the "key"), typically a number between 1 and 25. For each letter in your message, move that many steps forward in the alphabet, wrapping around to the beginning if you pass Z. For example, with a shift of 3, A becomes D, B becomes E, and so on, while X becomes A, Y becomes B, and Z becomes C. Numbers and special characters usually remain unchanged. To decrypt, simply shift each letter back by the same number of positions. The cipher is named after Julius Caesar, who allegedly used it with a shift of 3 to protect military messages. While easy to use and understand, the Caesar cipher is also extremely weak by modern standards. It can be easily broken by trying all 25 possible shifts or by frequency analysis of the ciphertext. Despite its simplicity, the Caesar cipher serves as a fundamental introduction to the concepts of encryption and forms the basis for more complex ciphers.`,
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
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
    description: `The Vigenère cipher is a method of encrypting text that uses a keyword to shift each letter of the message. Unlike simpler ciphers that use a fixed shift, Vigenère varies the shift based on the keyword, making it harder to crack. Here's how it works: You repeat the keyword to match the length of your message, then use each letter of the extended keyword to shift the corresponding letter in your message. For example, if your keyword is "KEY" and your message starts with "HELLO", you'd shift H by K (10 places), E by E (4 places), L by Y (24 places), L by K again, and O by E. This variable shifting makes patterns less obvious, as the same letter in your message can be encrypted differently each time it appears. To decrypt, you reverse the process, using the keyword to shift letters back to their original positions. While more secure than simple substitution ciphers, Vigenère can still be broken with advanced frequency analysis if the keyword length is discovered.`,
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
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
    description: `The poly-alphabetic cipher is a category of encryption methods that use multiple substitution alphabets to encrypt a message, making it more secure than simple substitution ciphers. Here's how it works: Instead of using a single fixed alphabet to replace each letter in the plaintext, poly-alphabetic ciphers employ several different alphabets. These alphabets are typically used in a predetermined sequence or based on a key. As you encrypt the message, you switch between these different alphabets for each letter or group of letters. This variation means that the same letter in the plaintext can be encoded as different letters in the ciphertext, depending on its position or the current alphabet in use. This feature significantly reduces the effectiveness of frequency analysis attacks, which rely on the consistent replacement of letters. The Vigenère cipher is a well-known example of a poly-alphabetic cipher, but there are others like the Alberti cipher and the Trithemius cipher. While more secure than mono-alphabetic ciphers, poly-alphabetic ciphers can still be vulnerable to cryptanalysis, especially if the pattern of alphabet switching is discovered or if the message is long enough for statistical patterns to emerge.`,
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
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
    description: `The One-Time Pad (OTP) cipher is a theoretically unbreakable encryption method when used correctly. Here's how it works: The OTP uses a random key that's the same length as the message being encrypted. Each bit or character of the plaintext is combined with the corresponding bit or character from the key using a simple operation, typically XOR for binary data or modular addition for text. The resulting ciphertext is effectively random and reveals no information about the original message without the key. To decrypt, the recipient applies the same key to the ciphertext, reversing the process. The crucial aspects of OTP are: the key must be truly random, as long as the message, used only once, and kept completely secret. When these conditions are met, it's impossible to crack the cipher through cryptanalysis, as every possible plaintext is equally likely. However, the main challenge of OTP lies in securely distributing and managing the large, one-use keys. This practical limitation restricts its use to scenarios where utmost security is required and secure key exchange is feasible, such as in some diplomatic or military communications.`,
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
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
  'playfair-cipher': {
    title: 'Playfair Cipher',
    description: `The Playfair cipher is a manual symmetric encryption technique that encrypts pairs of letters instead of single letters. Here's how it works: First, create a 5x5 grid filled with the alphabet, typically using a keyword to start and omitting one letter (usually J, combining it with I). To encrypt, divide the plaintext into pairs of letters. For each pair, locate the letters in the grid and apply these rules: If the letters are in different rows and columns, replace them with the letters in the same row as each input letter but at the intersection with the other letter's column. If they're in the same row, use the letters to their right (wrapping around if needed). If in the same column, use the letters below them. For identical letters or odd-length messages, insert a filler letter (like X) between them. This digraph approach makes the Playfair cipher stronger than simple substitution ciphers, as it obscures single-letter frequencies. However, it's still vulnerable to frequency analysis of letter pairs. Decryption follows the same process in reverse. While more secure than earlier ciphers, Playfair can be broken with sufficient ciphertext and is now primarily of historical interest.`,
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n+m)',
    codes: [
      {
        language: 'TypeScript',
        code: `function createGrid(key: string) {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const uniqueChars: { [key: string]: boolean } = {};
  const grid: string[] = [];

  for (const char of key.toUpperCase().replace(/J/g, 'I')) {
    if (!uniqueChars[char]) {
      uniqueChars[char] = true;
      grid.push(char);
    }
  }

  for (const char of alphabet) {
    if (!uniqueChars[char]) {
      uniqueChars[char] = true;
      grid.push(char);
    }
  }

  return grid;
}

function prepareText(text: string) {
  return text
    .toUpperCase()
    .replace(/J/g, 'I')
    .replace(/[^A-Z]/g, '');
}

function createEncryptionDigraphs(text: string) {
  const digraphs: string[] = [];
  for (let i = 0; i < text.length; i += 2) {
    if (i === text.length - 1) {
      digraphs.push(text[i] + 'X');
    } else if (text[i] === text[i + 1]) {
      digraphs.push(text[i] + 'X');
      i--;
    } else {
      digraphs.push(text.substr(i, 2));
    }
  }
  return digraphs;
}

function createDecryptionDigraphs(text: string) {
  return text.match(/.{1,2}/g) || [];
}

function findPosition(grid: string[], char: string): [number, number] {
  const index = grid.indexOf(char);
  return [Math.floor(index / 5), index % 5];
}

function encryptDigraph(grid: string[], digraph: string) {
  const [a, b] = digraph.split('');
  const [rowA, colA] = findPosition(grid, a);
  const [rowB, colB] = findPosition(grid, b);

  if (rowA === rowB) {
    return (
      grid[rowA * 5 + ((colA + 1) % 5)] + grid[rowB * 5 + ((colB + 1) % 5)]
    );
  }
  if (colA === colB) {
    return (
      grid[((rowA + 1) % 5) * 5 + colA] + grid[((rowB + 1) % 5) * 5 + colB]
    );
  }
  return grid[rowA * 5 + colB] + grid[rowB * 5 + colA];
}

function decryptDigraph(grid: string[], digraph: string) {
  const [a, b] = digraph.split('');
  const [rowA, colA] = findPosition(grid, a);
  const [rowB, colB] = findPosition(grid, b);

  if (rowA === rowB) {
    return (
      grid[rowA * 5 + ((colA - 1 + 5) % 5)] +
      grid[rowB * 5 + ((colB - 1 + 5) % 5)]
    );
  }
  if (colA === colB) {
    return (
      grid[((rowA - 1 + 5) % 5) * 5 + colA] +
      grid[((rowB - 1 + 5) % 5) * 5 + colB]
    );
  }
  return grid[rowA * 5 + colB] + grid[rowB * 5 + colA];
}

export function encryptWithPlayfairCipher(plaintext: string, key: string) {
  const grid = createGrid(key);
  const preparedText = prepareText(plaintext);
  const digraphs = createEncryptionDigraphs(preparedText);
  return digraphs.map((digraph) => encryptDigraph(grid, digraph)).join('');
}

export function decryptWithPlayfairCipher(ciphertext: string, key: string) {
  const grid = createGrid(key);
  const digraphs = createDecryptionDigraphs(ciphertext);
  return digraphs
    .map((digraph) => decryptDigraph(grid, digraph))
    .join('')
    .replace(/X$/, '')
    .replace(/X(?=.)/g, '');
}`,
      },
    ],
  },
  'rail-fence-cipher': {
    title: 'Rail Fence Cipher',
    description: `The Rail Fence cipher creates a zigzag pattern using multiple "rails" (horizontal lines). The plaintext is written downwards diagonally on these rails, bouncing up when it reaches the bottom rail and down when it reaches the top rail, creating a fence-like pattern. The ciphertext is formed by reading each rail horizontally from left to right, top to bottom. Think of it like writing your message on a zigzag train track and then reading each track line by line. The number of rails determines the pattern's complexity and thus affects the cipher's strength.`,
    bestCase: 'O(n²)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    codes: [
      {
        language: 'TypeScript',
        code: `export function encodeWithRailFenceCipher(text: string, rails: number): string {
  const fence = getEmptyFence(rails, text.length);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < text.length; i++) {
    fence[rail][i] = text[i];
    if (rail === 0) direction = 1;
    if (rail === rails - 1) direction = -1;
    rail += direction;
  }

  return fence
    .flat()
    .filter((char) => char)
    .join('');
}

export function decodeWithRailFenceCipher(text: string, rails: number): string {
  const fence = getEmptyFence(rails, text.length);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < text.length; i++) {
    fence[rail][i] = '*';
    if (rail === 0) direction = 1;
    if (rail === rails - 1) direction = -1;
    rail += direction;
  }

  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] === '*' && index < text.length) {
        fence[i][j] = text[index++];
      }
    }
  }

  let result = '';
  rail = 0;
  direction = 1;

  for (let i = 0; i < text.length; i++) {
    result += fence[rail][i];
    if (rail === 0) direction = 1;
    if (rail === rails - 1) direction = -1;
    rail += direction;
  }

  return result;
}

function getEmptyFence(rails: number, length: number): string[][] {
  return Array(rails)
    .fill('')
    .map(() => Array(length).fill(''));
}`,
      },
    ],
  },
  'hill-cipher': {
    title: 'Hill Cipher',
    description:
      'The Hill cipher is a polygraphic substitution cipher based on linear algebra. It encrypts blocks of text using matrix multiplication with a key matrix. In a 2x2 implementation, it processes two letters at a time, converting them to numbers (A=0, B=1, etc.), multiplying them with a 2x2 key matrix, and converting the results back to letters modulo 26. Decryption uses the inverse of the key matrix. Think of it as transforming pairs of letters through a mathematical function - like feeding coordinates through a geometric transformation. The strength lies in its mathematical properties and block encryption nature.',
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: `interface Matrix {
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
}`,
      },
    ],
  },
  'row-column-cipher': {
    title: 'Row Column Cipher',
    description:
      'The Row Column cipher is a simple transposition cipher that rearranges text using a matrix. The process involves writing the text row by row into a grid with a fixed number of columns (determined by the key), then reading it column by column to produce the encrypted text. For decryption, the process is reversed - the ciphertext is written column by column and read row by row. Imagine writing your message on a grid of paper, then reading it in a different direction. The security relies on the mixing up of character positions rather than substituting characters.',
    bestCase: 'O(n²)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    codes: [
      {
        language: 'TypeScript',
        code: `export function encodeWithRowColumnCipher(text: string, key: number): string {
  if (key <= 0) throw new Error('Key must be positive');
  if (key > text.length)
    throw new Error('Key cannot be larger than text length');

  const normalized = text.replace(/\s/g, '').toUpperCase();
  const cols = key;
  const rows = Math.ceil(normalized.length / cols);
  const matrix = getEmptyMatrix(rows, cols);

  for (let i = 0; i < normalized.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    matrix[row][col] = normalized[i];
  }

  let result = '';
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (matrix[row][col]) {
        result += matrix[row][col];
      }
    }
  }

  return result;
}

export function decodeWithRowColumnCipher(text: string, key: number): string {
  if (key <= 0) throw new Error('Key must be positive');
  if (key > text.length)
    throw new Error('Key cannot be larger than text length');

  const cols = key;
  const rows = Math.ceil(text.length / cols);
  const matrix = getEmptyMatrix(rows, cols);

  const lastRowFill = text.length % cols || cols;

  let idx = 0;
  for (let col = 0; col < cols; col++) {
    const rowLimit = col < lastRowFill ? rows : rows - 1;
    for (let row = 0; row < rowLimit; row++) {
      matrix[row][col] = text[idx++];
    }
  }

  let result = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col]) {
        result += matrix[row][col];
      }
    }
  }

  return result;
}

function getEmptyMatrix(rows: number, cols: number): string[][] {
  return Array(rows)
    .fill('')
    .map(() => Array(cols).fill(''));
}`,
      },
    ],
  },
  'des-cipher': {
    title: 'DES Cipher',
    description:
      'The simplified DES (Data Encryption Standard) implementation works by breaking the input text into fixed-size blocks (8 bits each) and applying a series of transformations using a key. Each block undergoes an XOR operation with the key bits, effectively scrambling the data. Think of it as mixing your message with a secret pattern, where each bit of your message is combined with a corresponding bit from your key. While this is a highly simplified version, the actual DES uses complex permutations, substitutions, and multiple rounds of transformation.',
    bestCase: 'O(n)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
    codes: [
      {
        language: 'TypeScript',
        code: `// Simplified DES (for educational purposes only - not cryptographically secure)
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
`,
      },
    ],
  },
};
