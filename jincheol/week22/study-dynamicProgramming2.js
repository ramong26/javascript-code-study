// 문제 링크: [점프 점프](https://www.acmicpc.net/problem/11060)

// 실행: node jincheol/week22/study-dynamicProgramming2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week22/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 미로의 가로 크기
 * @param {number[]} maze 미로의 구성
 */
const solution = (N, maze) => {
  const dp = new Array(N).fill(-1);
  dp[0] = 0;

  for (let i = 0; i < N; i++) {
    if (dp[i] === -1) continue;

    const max = maze[i];
    for (let n = 1; n <= max; n++) {
      const jump = i + n;
      if (jump >= N) break;

      const nextCount = dp[i] + 1;

      if (dp[jump] === -1) dp[jump] = nextCount;
      else dp[jump] = Math.min(dp[jump], nextCount);
    }
  }

  return dp.at(-1);
};

const N = parseInt(input[0]);
const maze = input[1].split(' ').map(Number);
console.log(solution(N, maze));
