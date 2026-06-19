export function checkWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [x, y, z] = lines[i];
    if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
      return boxes[x];
    }
  }
  return null;
}

export function getComputerMove(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (boxes[a] === 'O' && boxes[b] === 'O' && boxes[c] === null) return c;
    if (boxes[a] === 'O' && boxes[c] === 'O' && boxes[b] === null) return b;
    if (boxes[b] === 'O' && boxes[c] === 'O' && boxes[a] === null) return a;
  }

  for (let [a, b, c] of lines) {
    if (boxes[a] === 'X' && boxes[b] === 'X' && boxes[c] === null) return c;
    if (boxes[a] === 'X' && boxes[c] === 'X' && boxes[b] === null) return b;
    if (boxes[b] === 'X' && boxes[c] === 'X' && boxes[a] === null) return a;
  }

  if (boxes[4] === null) return 4;

  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter(i => boxes[i] === null);
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  const empty = boxes.reduce((acc, box, i) => {
    if (box === null) acc.push(i);
    return acc;
  }, []);
  if (empty.length > 0) {
    return empty[Math.floor(Math.random() * empty.length)];
  }

  return null;
}