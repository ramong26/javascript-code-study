// 문제 링크: [ATM](https://www.acmicpc.net/problem/11399)

// 실행: node jincheol/week14/study-greedy1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week14/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 사람 수
 * @param {number[]} times 각 사람들이 인출할 때 걸리는 시간들
 */
const solution = (N, times) => {
  const ascendingTimes = times.sort((a, b) => a - b); // 오름차순 정렬

  let answer = 0;
  for (let i = 0; i < N; i++) {
    answer += ascendingTimes[i]; // 본인 차례 시간 더하기

    // 본인 이전 사람들이 인출했을 때 걸리는 시간 더하기
    for (let j = 0; j < i; j++) {
      answer += ascendingTimes[j];
    }
  }

  return answer;
};

const N = parseInt(input.shift());
const times = input[0].split(' ').map(Number);
console.log(solution(N, times));
