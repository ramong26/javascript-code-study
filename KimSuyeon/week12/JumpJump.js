// https://www.acmicpc.net/problem/11060
// 11060 - 점프 점프 - 실버2

const input = require("fs")
  .readFileSync("./KimSuyeon/week12/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 문제요약
// N개의 칸이 있고 각 칸마다 점프할 수 있는 최대 거리가 주어질 때
// 1번 칸에서 N번 칸으로 도달하기 위한 최소 점프 횟수를 구하는 문제

function solution() {
  const N = Number(input[0]);
  const board = input[1].split(" ").map(Number);

  // dp 배열 초기화
  const dp = Array(N).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < N; i++) {
    if (dp[i] === Infinity) continue; // 도달할 수 없는 칸인 경우 무시

    const jump = board[i];
    // 현재 칸에서 점프할 수 있는 모든 거리 탐색
    for (let j = 1; j <= jump; j++) {
      if (i + j < N) {
        dp[i + j] = Math.min(dp[i + j], dp[i] + 1); // 최소 점프 횟수 갱신
      }
    }
  }

  console.log(dp[N - 1] === Infinity ? -1 : dp[N - 1]);
}

solution();
// input example
// 10
// 1 2 0 1 3 2 1 5 4 2
