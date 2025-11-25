// https://www.acmicpc.net/problem/14425
// 14425 - 문자열 집합 - 실버 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week16/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const S = new Set(input.slice(1, N + 1));
  let count = 0;

  for (let i = N + 1; i <= N + M; i++) {
    if (S.has(input[i])) count++;
  }
  return count;
}

console.log(solution(input));
