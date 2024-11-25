export function encodeWithRowColumnCipher(text: string, key: number): string {
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
}
