// 문제 링크: [아기 상어 2](https://www.acmicpc.net/problem/17086)

// 실행: node jincheol/week24/study-bfs1.js

/**
 *
 * @param {number} N 행의 개수
 * @param {number} M 열의 개수
 * @param {number[][]} board 공간의 상태
 */
const solution = (N, M, board) => {
  const move = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const safeDistance = Array.from({ length: N }, () => new Array(M).fill(0));

  const queue = [];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] === 1) {
        queue.push([r, c]);
        safeDistance[r][c] = 1;
      }
    }
  }

  let idx = 0;
  let max = 0;

  while (idx < queue.length) {
    const [r, c] = queue[idx++];
    let curDistance = safeDistance[r][c];

    for (const [dr, dc] of move) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue;

      if (safeDistance[nr][nc] === 0) {
        safeDistance[nr][nc] = curDistance + 1;
        queue.push([nr, nc]);
        max = Math.max(max, safeDistance[nr][nc] - 1);
      }
    }
  }

  return max;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, board));
