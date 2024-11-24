export function encodeWithRailFenceCipher(text: string, rails: number): string {
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
}
