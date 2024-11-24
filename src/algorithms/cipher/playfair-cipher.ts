function createGrid(key: string) {
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
}
