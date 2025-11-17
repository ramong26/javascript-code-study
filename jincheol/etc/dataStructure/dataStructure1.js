// 문제 링크: [회사에 있는 사람](https://www.acmicpc.net/problem/7785)
// 실행: node jincheol/etc/dataStructure/dataStructure1.js

/**
 *
 * @param {number} N 직원 수
 * @param {[string, string]} log 직원 이름과 출입 기록
 */
const solution = (N, log) => {
  const working = new Set(); // 일 하는 사람을 저장할 Set

  // 기록 순회
  for (const [name, record] of log) {
    if (record === 'enter') working.add(name); // 출근했으면 추가
    else working.delete(name); // 퇴근하면 삭제
  }

  // Set을 배열로 변환 후 사전순의 역순으로 정렬
  const workingArr = Array.from(working).sort((a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });

  return workingArr.join('\n'); // 형식에 맞게 변환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const log = input.slice(1).map((v) => v.trim().split(' '));
console.log(solution(N, log));
