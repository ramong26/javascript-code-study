// 문제 링크: [숫자 재배치](https://www.acmicpc.net/problem/16943)
// 실행: node jincheol/etc/bruteForce/bruteForce5.js

/**
 *
 * @param {string} A 숫자를 섞어서 C를 만들 정수
 * @param {string} B 만든 C가 B보다 작아야 하는 정수
 */
const solution = (A, B) => {
  const len = A.length; // 최종적으로 만들 숫자의 길이
  // 사용할 숫자들 (중복 방지 및 편의를 위해 오름차순 정렬)
  const aNums = A.split('')
    .map(Number)
    .sort((a, b) => a - b);

  let C = -1; // 최종 숫자

  /**
   *
   * @param {number} depth 현재 만든 숫자의 길이 (사용한 숫자의 개수)
   * @param {string} curC 현재 만든 숫자 (문자열)
   * @param {boolean[]} usedNums 사용한 숫자들을 표시할 배열
   */
  const dfs = (depth, curC, usedNums) => {
    // 숫자를 다 만들었으면
    if (depth === len) {
      const c = parseInt(curC); // 만든 숫자
      // B보다 작아야하는 조건을 만족하면 C 갱신(최댓값)
      if (c < parseInt(B)) C = Math.max(C, c);
      return; // 종료
    }

    // 다른 숫자들 순회
    for (let i = 0; i < len; i++) {
      if (usedNums[i]) continue; // 사용한 숫자면 건너뛰기

      const next = aNums[i]; // 사용할 숫자
      if (depth === 0 && next === 0) continue; // 첫 숫자가 0이면 건너뛰기

      // 같은 숫자가 있을 경우 중복된 수를 방지하기 위함
      // 이전 탐색 숫자와 사용할 숫자가 같지만 이전 숫자를 사용하지 않은 경우임
      // e.g. 이전 탐색 숫자가 2고 사용할 숫자가 2 일 때 이 전 탐색 숫자를 사용하지 않는 경우
      if (i > 0 && next === aNums[i - 1] && !usedNums[i - 1]) continue;

      usedNums[i] = true; // 사용 표시
      dfs(depth + 1, curC + next, usedNums); // 재귀 호출
      usedNums[i] = false; // 백트레킹
    }
  };

  dfs(0, '', new Array(len).fill(false)); // 탐색 시작

  return C;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [A, B] = input[0].split(' ');
console.log(solution(A, B));
