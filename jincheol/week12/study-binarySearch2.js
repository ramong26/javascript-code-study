// 문제 링크: [나무 자르기](https://www.acmicpc.net/problem/2805)

// 실행: node jincheol/week12/study-binarySearch2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week12/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 나무의 개수
 * @param {number} M 집으로 가져가려고 하는 나무의 길이
 * @param {number[]} trees 나무들의 높이
 */
const solution = (N, M, trees) => {
  let answer = 0;
  let min = 1;
  let max = Math.max(...trees);

  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let totalTreeLen = 0;

    for (let tree of trees) {
      totalTreeLen += tree - mid > 0 ? tree - mid : 0;
      if (totalTreeLen >= M) break;
    }

    if (totalTreeLen >= M) {
      answer = mid;
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return answer;
};

const [N, M] = input[0].split(' ').map(Number);
const trees = input[1].split(' ').map(Number);

console.log(solution(N, M, trees));
