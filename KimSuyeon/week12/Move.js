// https://www.acmicpc.net/problem/11048
// 11048 - 이동하기 - 실버2

const input = require("fs")
  .readFileSync("./KimSuyeon/week12/input1.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 문제요약
// 준규가 (1, 1)에서 (N, M)으로 이동할 때 이때 가져갈 수 있는 사탕의 최대 갯수는?

function solution() {
  const [N, M] = input[0].split(" ").map(Number); // 3 4
  const board = input.slice(1).map((line) => line.split(" ").map(Number));

  // dp 배열 초기화
  const dp = Array.from({ length: N }, () => Array(M).fill(0));
  // 시작점 초기화
  dp[0][0] = board[0][0];

  // 모든 칸을 탐색 하며 최대 사탕 개수 갱신
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 위에서 내려오는 경우 현재 칸이 위쪽이 존재할 때
      if (i > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + board[i][j]); // 사탕 개수 최대 갱신
      }
      // 왼쪽에서 오는 경우 현재 칸이 왼쪽이 존재할 때
      if (j > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i][j - 1] + board[i][j]); // 사탕 개수 최대 갱신
      }
      // 대각선에서 오는 경우 현재 칸이 대각선 위쪽이 존재할 때
      if (i > 0 && j > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + board[i][j]); // 사탕 개수 최대 갱신
      }
    }
  }

  console.log(dp[N - 1][M - 1]);
}

solution();
// input 예시
// 3 4
// 1 2 3 4
// 0 0 0 5
// 9 8 7 6
