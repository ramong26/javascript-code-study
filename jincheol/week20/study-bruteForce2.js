// 문제 링크: [등차수열 변환](https://www.acmicpc.net/problem/17088)

// 실행: node jincheol/week20/study-bruteForce2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week20/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 수열의 크기
 * @param {number[]} numbers 수열
 */
const solution = (N, numbers) => {
  if (N < 3) return 0;

  const range = [0, -1, 1];

  let answer = Infinity;

  for (const r1 of range) {
    for (const r2 of range) {
      const num1 = numbers[0] + r1;
      const num2 = numbers[1] + r2;
      const rawGap = num2 - num1;

      let canChange = true;
      let prevNum = num2;
      let changeCount = 0;
      if (r1 !== 0) changeCount++;
      if (r2 !== 0) changeCount++;

      for (let i = 2; i < N; i++) {
        const expectNum = prevNum + rawGap;
        const curNum = numbers[i];
        const gap = curNum - expectNum;

        if (Math.abs(gap) > 1) {
          canChange = false;
          break;
        }

        if (gap !== 0) changeCount++;
        prevNum = expectNum;
      }

      if (canChange) answer = Math.min(answer, changeCount);
    }
  }

  return answer === Infinity ? -1 : answer;
};

const N = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);
console.log(solution(N, numbers));
