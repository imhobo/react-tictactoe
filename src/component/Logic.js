const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function checkWinner(boxes) {
  for (const [x, y, z] of LINES) {
    if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
      return boxes[x];
    }
  }
  return null;
}

export function getWinningLine(boxes) {
  for (const line of LINES) {
    const [x, y, z] = line;
    if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
      return line;
    }
  }
  return [];
}

/* ── Minimax AI (unbeatable) ── */

function getAvailable(boxes) {
  return boxes.reduce((acc, b, i) => (b === null ? [...acc, i] : acc), []);
}

function checkResult(boxes) {
  for (const [x, y, z] of LINES) {
    if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
      return boxes[x] === 'O' ? 10 : -10;
    }
  }
  return 0;
}

function minimax(boxes, depth, isMaximizing) {
  const result = checkResult(boxes);
  if (result !== 0) return result;
  if (getAvailable(boxes).length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of getAvailable(boxes)) {
      boxes[i] = 'O';
      best = Math.max(best, minimax(boxes, depth + 1, false));
      boxes[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of getAvailable(boxes)) {
      boxes[i] = 'X';
      best = Math.min(best, minimax(boxes, depth + 1, true));
      boxes[i] = null;
    }
    return best;
  }
}

export function getComputerMove(boxes) {
  let bestScore = -Infinity;
  let bestMove = null;

  for (const i of getAvailable(boxes)) {
    boxes[i] = 'O';
    const score = minimax([...boxes], 0, false);
    boxes[i] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}
