// 문제 링크: [1학년](https://www.acmicpc.net/problem/5557)

// 실행: node jincheol/week23/personal-dynamicProgramming.js

/**
 *
 * @param {number} N 숫자의 개수
 * @param {number[]} numbers 숫자들
 */
const solution = (N, numbers) => {
  const target = numbers.pop(); // 목표하는 숫자
  // dp 테이블. 각 단계 배열의 내부 배열은 0 ~ 20의 수를 만드는 경우의 수 저장
  const dp = Array.from({ length: N - 1 }, () => new Array(21).fill(0n));
  dp[0][numbers[0]] = 1n; // 첫 단계의 숫자는 1가지 경우 (BigInt 사용)

  // numbers 순회 (두 번째 숫자부터)
  for (let i = 1; i < N - 1; i++) {
    const calcHistory = dp[i - 1]; // 이전 단계에서 만들 수 있는 숫자들의 경우의 수 배열
    const curNum = numbers[i]; // 현재 계산할 숫자
    // 0 ~ 20 순회 (calcHistory의 길이)
    for (let num = 0; num <= 20; num++) {
      const count = calcHistory[num]; // 현재 num을 만드는 경우의 수
      if (count === 0) continue; // 0이면 건너뛰기

      const pNum = num + curNum; // 더했을 때
      if (pNum <= 20) dp[i][pNum] += count; // 20 이하면 현재 단계의 숫자에 카운트 더하기

      const mNum = num - curNum; // 뺐을 때
      if (mNum >= 0) dp[i][mNum] += count; // 0 이상이면 현재 단계의 숫자에 카운트 더하기
    }
  }

  return dp.at(-1).at(target).toString(); // dp의 마지막 단계의 target 숫자의 경우의수 출력
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
