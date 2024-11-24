export function encodeWithRowColumnCipher(text: string, key: number): string {
  const normalized = text.replace(/\s/g, '').toUpperCase();
  const cols = key;
  const rows = Math.ceil(normalized.length / cols);
  const matrix = getEmptyMatrix(rows, cols);

  let idx = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols && idx < normalized.length; j++) {
      matrix[i][j] = normalized[idx++];
    }
  }

  let result = '';
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      if (matrix[i][j]) result += matrix[i][j];
    }
  }

  return result;
}

export function decodeWithRowColumnCipher(text: string, key: number): string {
  const cols = key;
  const rows = Math.ceil(text.length / cols);
  const matrix = getEmptyMatrix(rows, cols);

  let idx = 0;
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows && idx < text.length; i++) {
      matrix[i][j] = text[idx++];
    }
  }

  let result = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j]) result += matrix[i][j];
    }
  }

  return result;
}

function getEmptyMatrix(rows: number, cols: number): string[][] {
  return Array(rows)
    .fill('')
    .map(() => Array(cols).fill(''));
}
