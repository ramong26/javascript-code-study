// 문제 링크: [접두사 찾기](https://www.acmicpc.net/problem/14426)

// 실행: node jincheol/week26/personal-stringAlgorithms.js

/**
 *
 * @param {number} N 집합 S의 문자열 개수
 * @param {number} M 테스트 케이스 문자열 개수
 * @param {string[]} S 집합 S
 * @param {string[]} tStrings 테스트 케이스 문자열들
 */
const solution = (N, M, S, tStrings) => {
  // 시간 초과 풀이
  // const sMap = new Map();
  // for (let str of S) {
  //   const startString = str[0];
  //   if (!sMap.get(startString)) sMap.set(startString, []);
  //   sMap.get(startString).push(str);
  // }

  // let count = 0;

  // tStrings.forEach((testString) => {
  //   const startString = testString[0];
  //   const sameStartStrings = sMap.get(startString);
  //   if (!sameStartStrings) return;

  //   for (let str of sameStartStrings) {
  //     if (str.startsWith(testString)) {
  //       count++;
  //       break;
  //     }
  //   }
  // });

  const prefixStrings = new Set(); // 집합 S의 문자열들의 가능한 접두사들을 저장할 Set
  // 집합 S 순회
  for (const str of S) {
    // 집합 S의 문자열의 길이만큼 순회
    for (let i = 1; i <= str.length; i++) {
      const prefix = str.substring(0, i); // 접두사 추출
      prefixStrings.add(prefix); // 접두사 저장
    }
  }

  let count = 0;
  // 테스트 문자열들 순회
  for (const testString of tStrings) {
    if (prefixStrings.has(testString)) count++; // 저장한 접두사에 있으면 카운트 증가
  }

  return count;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const S = input.slice(1, N + 1).map((v) => v.trim());
const tStrings = input.slice(N + 1).map((v) => v.trim());
console.log(solution(N, M, S, tStrings));
