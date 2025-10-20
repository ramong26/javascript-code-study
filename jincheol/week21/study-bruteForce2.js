// 문제 링크: [A -> B](https://www.acmicpc.net/problem/16953)

// 실행: node jincheol/week21/study-bruteForce2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week21/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 역순 변환
 * @param {string} A
 * @param {string} B
 */
const solution = (A, B) => {
  let count = 1;

  while (+B > +A) {
    if (B.endsWith('1')) {
      B = B.slice(0, -1);
      count++;
    } else if (+B % 2 === 0) {
      B = String(B / 2);
      count++;
    } else {
      count = -1;
      break;
    }
  }

  if (B !== A) return -1;

  return count;
};

const [A, B] = input[0].split(' ');
console.log(solution(A, B));
