// https://www.acmicpc.net/problem/1764
// 듣보잡 - 실버 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week19/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// input을 이용해 일단 각 집합을 만든다
// 집합을 돌면서 겹치는 원소를 찾는다

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);

  const neverHeard = new Set();
  const neverSeen = new Set();

  // 각 집합 만들기
  for (let i = 1; i <= N; i++) {
    neverHeard.add(input[i]);
  }

  for (let i = N + 1; i <= N + M; i++) {
    neverSeen.add(input[i]);
  }

  // 겹치는 원소 찾기
  const result = [];

  for (const name of neverHeard) {
    if (neverSeen.has(name)) {
      result.push(name);
    }
  }

  result.sort();

  return `${result.length}\n${result.join("\n")}`;
}

console.log(solution(input));
