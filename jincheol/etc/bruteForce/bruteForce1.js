// 문제 링크: [로마 숫자 만들기](https://www.acmicpc.net/problem/16922)
// 실행: node jincheol/etc/bruteForce/bruteForce1.js

/**
 *
 * @param {number} N 사용할 수 있는 문자의 개수
 */
const solution = (N) => {
  const numbers = [1, 5, 10, 50]; // 사용하는 숫자들
  const maked = new Set(); // 계산 결과를 저장할 Set

  /**
   *
   * @param {number} depth 현재까지 선택한 문자의 개수
   * @param {number} sum 현재까지 선택한 문자들의 합
   * @param {number} start 현재 단계에서 선택을 시작할 numbers의 인덱스 (중복 탐색 방지)
   */
  const dfs = (depth, sum, start) => {
    // 종료 조건
    if (depth === N) {
      maked.add(sum); // 계산 결과 저장
      return; // 종료
    }
    // 추가 탐색
    for (let i = start; i < 4; i++) {
      dfs(depth + 1, sum + numbers[i], i);
    }
  };

  dfs(0, 0, 0); // 탐색 시작

  return maked.size;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
console.log(solution(N));
