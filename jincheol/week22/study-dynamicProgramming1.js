// 문제 링크: [이동하기](https://www.acmicpc.net/problem/11048)

// 실행: node jincheol/week22/study-dynamicProgramming1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week22/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 미로의 행 개수
 * @param {number} M 미로의 열 개수
 * @param {number[][]} maze
 */
const solution = (N, M, maze) => {
  const dp = Array.from({ length: N }, () => new Array(M).fill(0));

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      let maxPrevCandy = 0;

      if (r > 0) maxPrevCandy = Math.max(maxPrevCandy, dp[r - 1][c]);
      if (c > 0) maxPrevCandy = Math.max(maxPrevCandy, dp[r][c - 1]);
      if (r > 0 && c > 0) {
        maxPrevCandy = Math.max(maxPrevCandy, dp[r - 1][c - 1]);
      }

      dp[r][c] = maxPrevCandy + maze[r][c];
    }
  }

  return dp[N - 1][M - 1];
};

const [N, M] = input.shift().split(' ').map(Number);
const maze = input.map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, maze));
