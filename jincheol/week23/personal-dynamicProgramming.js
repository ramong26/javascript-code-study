// 문제 링크: [1학년](https://www.acmicpc.net/problem/5557)

// 실행: node jincheol/week23/personal-dynamicProgramming.js

/**
 *
 * @param {number} N 숫자의 개수
 * @param {number[]} numbers 숫자들
 */
const solution = (N, numbers) => {
  const target = numbers.pop();
  const dp = Array.from({ length: N - 1 }, () => new Array(21).fill(0n));
  dp[0][numbers[0]] = 1n;

  for (let i = 1; i < N - 1; i++) {
    const calcHistory = dp[i - 1];
    const curNum = numbers[i];
    for (let num = 0; num <= 20; num++) {
      const count = calcHistory[num];
      if (count === 0) continue;

      const pNum = num + curNum;
      if (pNum <= 20) dp[i][pNum] += count;

      const mNum = num - curNum;
      if (mNum >= 0) dp[i][mNum] += count;
    }
  }

  return dp.at(-1).at(target).toString();
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);
console.log(solution(N, numbers));
