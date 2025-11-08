// https://www.acmicpc.net/problem/1890
// 1890 - 점프 - 실버1

const input = require("fs")
  .readFileSync("./KimSuyeon/week13/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 문제요약 N x N 크기의 보드가 주어지고
// 각 칸에는 점프할 수 있는 거리가 적혀있다.
// (1,1)에서 시작하여 (N,N)까지 도달하는 경로의 수를 구하는 문제
// 접근: 오른쪽과 아래쪽으로만 이동 가능
// 미리 방향을 정의해놓고 dp 배열을 만들어서 Dp

const N = parseInt(input[0]);
const board = input
  .slice(1)
  .map((line) => line.trim().split(/\s+/).map(Number));

function jumpGame(board, N) {
  const dp = Array.from({ length: N }, () => Array(N).fill(0));
  dp[0][0] = 1; // 시작점 초기화

  const directions = [
    [0, 1], // 오른쪽
    [1, 0], // 아래쪽
  ];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const jumpDistance = board[i][j]; // 현재 칸에서 점프할 수 있는 거리
      if (jumpDistance === 0 || (i === N - 1 && j === N - 1)) continue;
      // 도착점이거나 점프할 수 없는 칸

      // 각 방향으로 점프 시도
      for (let [dx, dy] of directions) {
        const ni = i + dx * jumpDistance;
        const nj = j + dy * jumpDistance;

        // 보드 범위 내에 있을 때만 이동
        if (ni < N && nj < N) {
          dp[ni][nj] += dp[i][j]; // 현재 칸 (i, j)에서 점프해서 도착할 수 있는 칸 (ni, nj)에, (i, j)까지 올 수 있는 모든 경로의 수를 더함
        }
      }
    }
  }

  return dp[N - 1][N - 1];
}

console.log(jumpGame(board, N));

// input example
// 4
// 2 3 3 1
// 1 2 1 3
// 1 2 3 1
// 3 1 1 0
