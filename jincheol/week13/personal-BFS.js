// 문제 링크: [데스 나이트](https://www.acmicpc.net/problem/16948)

// 실행: node jincheol/week13/personal-BFS.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week13/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 보드의 크기
 * @param {[number, number]} start 시작하는 칸 [r1, c1]
 * @param {[number, number]} end 목표하는 칸 [r2, c2]
 * @returns
 */
const solution = (N, start, end) => {
  const board = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => -1)
  );
  const goR = [-2, -2, 0, 0, 2, 2];
  const goC = [-1, 1, -2, 2, -1, 1];

  const queue = [start];
  board[start[0]][start[1]] = 0;

  while (queue.length) {
    const [r, c] = queue.shift();
    if (r === end[0] && c === end[1]) return board[r][c];

    for (let i = 0; i < 6; i++) {
      const nextR = r + goR[i];
      const nextC = c + goC[i];

      if (nextR >= N || nextR < 0 || nextC >= N || nextC < 0) continue;

      if (board[nextR][nextC] === -1) {
        board[nextR][nextC] = board[r][c] + 1;
        queue.push([nextR, nextC]);
      }
    }
  }

  return -1;
};

const N = parseInt(input.shift());
const [r1, c1, r2, c2] = input[0].split(' ').map(Number);
console.log(solution(N, [r1, c1], [r2, c2]));
