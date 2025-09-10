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
  const positiveNumbers = []; // 양수들
  const negativeNumbers = []; // 음수들
  const one = []; // 1
  let hasZero = false; // 0이 있는지

  // 수 분류
  for (const num of numbers) {
    if (num > 1) positiveNumbers.push(num);
    else if (num === 1) one.push(num);
    else if (num < 0) negativeNumbers.push(num);
    else hasZero = true;
  }

  positiveNumbers.sort((a, b) => b - a); // 양수는 내림차순
  negativeNumbers.sort((a, b) => a - b); // 음수는 오름차순 (절대값 기준 내림차순)
  let answer = 0; // 정답

  // 양수를 순회
  for (let i = 0; i < positiveNumbers.length; i += 2) {
    const curNum = positiveNumbers[i]; // 현재 숫자
    const nextNum = positiveNumbers[i + 1]; // 다음 숫자
    // 다음 숫자가 있을 경우
    if (nextNum) {
      answer += curNum * nextNum; // 수 묶기 (곱을 더하기)
    } else {
      // 다음 숫자가 없으면 (양수가 홀수개일 때 제일 작은 양수)
      answer += curNum; // 더하기
    }
  }

  // 음수를 순회
  for (let i = 0; i < negativeNumbers.length; i += 2) {
    const curNum = negativeNumbers[i]; // 현재 숫자
    const nextNum = negativeNumbers[i + 1]; // 다음 숫자
    // 다음 숫자가 있을 경우
    if (nextNum) {
      answer += curNum * nextNum; // 수 묶기 (음수끼리 곱하여 양수 만들기)
    } else {
      // 다음 숫자가 없고(홀수개일 때), 0이 없는 상태라면 더한다
      // 0이 있으면 0이랑 묶어서 곱을 더하면 되지만 answer += 0이기 때문에 0이랑 묶는 경우는 생략
      if (!hasZero) answer += curNum;
    }
  }

  answer += one.length; // 1들은 더해줌

  return answer;
};

const N = parseInt(input.shift());
const numbers = input.map(Number);
console.log(solution(N, numbers));
