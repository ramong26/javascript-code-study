// 문제 링크: [국영수](https://www.acmicpc.net/problem/10825)

// 실행: node jincheol/week18/study-sort1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week18/input1.txt')
  .toString()
  .trim()
  .split('\n');
/**
 *
 * @param {number} N 학생 수
 * @param {[string, number, number, number][]} students 학생의 이름과 점수 이중 배열
 */
const solution = (N, students) => {
  students.sort((a, b) => {
    // 점수가 같으면 다른 조건 => 다르면 조건대로
    if (a[1] !== b[1]) return b[1] - a[1]; // 국어 점수 내림차순
    if (a[2] !== b[2]) return a[2] - b[2]; // 국어 점수 같으면 영어 점수 오름차 순
    if (a[3] !== b[3]) return b[3] - a[3]; // 국어 영어 같으면 수학 점수 내림차 순
    if (a[0] < b[0]) return -1; // 모든 점수 같으면 이름 사전순 증가 순
    return 0;
  });

  let answer = ''; // 정답 문자열
  for (const [name, ...scores] of students) {
    answer += name + '\n'; // 이름 추가 후 줄 바꿈
  }

  return answer;
};

const N = parseInt(input.shift());
const students = input.map((v) => {
  const [name, ...scores] = v.trim().split(' ');
  return [name, ...scores.map(Number)];
});
console.log(solution(N, students));
