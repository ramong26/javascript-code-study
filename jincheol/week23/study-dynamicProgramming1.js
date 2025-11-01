// 문제 링크: [크리보드](https://www.acmicpc.net/problem/11058)

// 실행: node jincheol/week23/study-dynamicProgramming1.js

/**
 *
 * @param {number} N 크리보드를 누르는 횟수
 */
const solution = (N) => {
  if (N <= 6) return N;

  const dp = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    dp[i] = dp[i - 1] + 1;

    for (let k = 3; k <= i; k++) {
      const newVal = dp[i - k] * (k - 1);
      if (newVal > dp[i]) dp[i] = newVal;
    }
  }

  return dp.at(-1);
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
console.log(solution(N));
