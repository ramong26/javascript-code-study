// 문제 링크: [수 묶기](https://www.acmicpc.net/problem/1744)

// 실행: node jincheol/week15/study-greedy2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week15/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 큰 양수끼리 곱하고 큰 음수끼리 곱하기
 * @param {number} N 수열의 크기 0 < N < 50
 * @param {number[]} numbers 수열
 */
const solution = (N, numbers) => {
  const positiveNumbers = [];
  const negativeNumbers = [];
  const one = [];
  let hasZero = false;

  for (const num of numbers) {
    if (num > 1) positiveNumbers.push(num);
    else if (num === 1) one.push(num);
    else if (num < 0) negativeNumbers.push(num);
    else hasZero = true;
  }

  positiveNumbers.sort((a, b) => b - a);
  negativeNumbers.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < positiveNumbers.length; i += 2) {
    const curNum = positiveNumbers[i];
    const nextNum = positiveNumbers[i + 1];
    if (nextNum) {
      answer += curNum * nextNum;
    } else {
      answer += curNum;
    }
  }

  for (let i = 0; i < negativeNumbers.length; i += 2) {
    const curNum = negativeNumbers[i];
    const nextNum = negativeNumbers[i + 1];
    if (nextNum) {
      answer += curNum * nextNum;
    } else {
      if (!hasZero) answer += curNum;
    }
  }

  answer += one.length;

  return answer;
};

const N = parseInt(input.shift());
const numbers = input.map(Number);
console.log(solution(N, numbers));
