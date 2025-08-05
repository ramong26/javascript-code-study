// 문제 링크: [부분수열의 합2](https://www.acmicpc.net/problem/14225)

// 실행: node jincheol/week10/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week10/input3.txt')
  .toString()
  .trim()
  .split('\n');

const S = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);

// 개선된 풀이
const sums = new Set();

/**
 *
 * @param {number} depth 현재 탐색 중인 배열의 인덱스
 * @param {number} sum 현재까지 탐색한 부분수열의 합
 * @returns
 */
const dfs = (depth, sum) => {
  // 모든 원소를 순회했을 때
  if (depth === S) {
    // 모든 원소를 포함하지 않는 경우를 제외하고
    if (sum !== 0) {
      // 합 추가
      sums.add(sum);
    }
    return;
  }

  // 현재 원소를 합에 포함하는 경우
  dfs(depth + 1, sum + numbers[depth]);

  // 현재 원소를 합에 포함하지 않는 경우
  dfs(depth + 1, sum);
};

dfs(0, 0);

// 부분 수열의 합으로 나올 수 없는 가장 작은 자연수 찾기
let answer = 1;
while (sums.has(answer)) {
  answer++;
}
console.log(answer);

// 기존 풀이
// 최대 합을 구하고 해당 수까지의 모든 자연수를 불린 값으로 초기화
const maxSum = numbers.reduce((acc, cur) => (acc += cur), 0);
const allNumber = Array.from({ length: maxSum }, () => false);

/**
 *
 * @param {number} depth 현재 탐색 중인 배열의 인덱스
 * @param {number} sum 현재까지 탐색한 부분수열의 합
 * @returns
 */
const dfs2 = (depth, sum) => {
  // 모든 원소를 순회했을 때
  if (depth === S) {
    // 모든 원소를 포함하지 않는 경우를 제외하고
    if (sum !== 0) {
      // 합에 해당하는 index를 true로 변경
      allNumber[sum - 1] = true;
    }
    return;
  }

  // 현재 원소를 합에 포함하는 경우
  dfs(depth + 1, sum + numbers[depth]);

  // 현재 원소를 합에 포함하지 않는 경우
  dfs(depth + 1, sum);
};

// dfs(0, 0);

// false인 (합을 만들 수 없는 자연수) 인덱스를 찾고
const minNumIndex = allNumber.findIndex((val) => val === false);
// 찾지 못했을 때 (모든 합을 만들 수 있는 경우)
if (minNumIndex === -1) {
  console.log(maxSum + 1); // 최대값 + 1
} else {
  console.log(minNumIndex + 1); // index값 + 1
}
