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
 * B를 A로 역순 변환
 * @param {string} A
 * @param {string} B
 */
const solution = (A, B) => {
  let count = 1; // 변환 횟수

  // dfs로 시도했으나 실패함 -> bfs로 시도
  // 숫자 B가 A보다 크면 탐색
  while (+B > +A) {
    // 숫자의 마지막이 1이면
    if (B.endsWith('1')) {
      B = B.slice(0, -1); // 마지막 숫자 1 제거
      count++; // 변환 횟수 증가
    }
    // 마지막 숫자가 1이 아니고 짝수일 경우
    else if (+B % 2 === 0) {
      B = String(B / 2); // 2로 나누기
      count++; // 변환 횟수 증가
    }
    // 둘 다 아닌 경우는 변환이 불가능한 경우
    else return -1;
  }

  // 역으로 변환을 마친 숫자 B가 A보다 같거나 작은 경우
  // 다르면 -1 return
  if (B !== A) return -1;

  return count;
};

const [A, B] = input[0].split(' ');
console.log(solution(A, B));
