// 문제 링크: [A와 B](https://www.acmicpc.net/problem/12904)

// 실행: node jincheol/week15/personal-greedy.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week15/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * S -> T는 경우의 수가 많음(dfs는 오래 걸림)
 * T -> S 역순으로 변환하기
 * @param {string} S 시작 문자
 * @param {string} T 완성된 문자
 */
const solution = (S, T) => {
  let curStr = T; // 역순으로 변환할 문자열 복사본

  // 시작 문자의 길이와 같아질 때까지
  while (curStr.length > S.length) {
    // 연산은 문자 마지막에 A를 추가하거나 B를 추가하는 두가지 경우임
    // A로 끝나는 경우 -> 첫번째 경우임
    if (curStr.endsWith('A')) {
      // 문자열의 마지막 A를 제거
      curStr = curStr.slice(0, curStr.length - 1);
    } else {
      // B로 끝나는 경우 -> 두번째 경우
      // 문자열의 마지막 B를 제거
      curStr = curStr.slice(0, curStr.length - 1);
      // 문자열 뒤집기
      curStr = curStr.split('').reverse().join('');
    }
  }

  // 문자열들의 길이가 같아져서 while문이 종료되면 두 문자를 비교
  if (curStr === S) return 1; // 같으면 변환 가능하기에 1
  return 0; // 다르면 변환 불가능이라 0
};

const S = input.shift().trim();
const T = input.shift();
console.log(solution(S, T));
