// 문제 링크: [나이순 정렬](https://www.acmicpc.net/problem/10814)

// 실행: node jincheol/week18/personal-sort.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week18/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N
 * @param {[number, string][]} members
 */
const solution = (N, members) => {
  members.sort((a, b) => {
    // 나이가 다르면 내림차순
    if (a[0] !== b[0]) return a[0] - b[0];
    // 나이가 같으면 먼저 가입한 순(index 순서 -> 바꾸지 않음)
    return 0;
  });

  let answer = '';
  // 정렬된 회원들을 문자열로 변경
  for (const member of members) {
    answer += member.join(' ') + '\n';
  }

  return answer;
};

const N = parseInt(input.shift());
const members = input.map((v) => {
  const [age, name] = v.trim().split(' ');
  return [+age, name];
});

console.log(solution(N, members));
