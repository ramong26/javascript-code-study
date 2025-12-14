// https://www.acmicpc.net/problem/1689
// 겹치는 선분 - 골드 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week18/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 선분이 1차원?
// 겹치는 선분의 최대 개수 구하기
function solution(input) {
  const N = Number(input[0]);
  const events = [];

  for (let i = 1; i <= N; i++) {
    const [s, e] = input[i].split(" ").map(Number);
    events.push([s, 1]); // 시작
    events.push([e, -1]); // 끝 (겹침 X라서 먼저 빠짐)
  }

  // 좌표 오름차순
  // 같은 좌표면 끝(-1) 먼저
  events.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let cur = 0;
  let max = 0;

  // 첫번째 값은 버림
  for (const [, v] of events) {
    cur += v;
    if (cur > max) max = cur;
  }

  return max;
}
console.log(solution(input));

// input 예시
// 11
// 1 2
// 3 6
// 7 8
// 10 11
// 13 16
// 0 5
// 5 6
// 2 5
// 6 10
// 9 14
// 12 15
