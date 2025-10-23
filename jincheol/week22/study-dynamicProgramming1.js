// 문제 링크: [이동하기](https://www.acmicpc.net/problem/11048)

// 실행: node jincheol/week22/study-dynamicProgramming1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week22/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 현재 칸에 도달할 수 있는 3가지의 이전 칸들의 값 중 가장 큰 값과 현재 칸을 더하여 dp에 저장
 * @param {number} N 미로의 행 개수
 * @param {number} M 미로의 열 개수
 * @param {number[][]} maze 미로 구성
 */
const solution = (N, M, maze) => {
  const dp = Array.from({ length: N }, () => new Array(M).fill(0)); // dp 테이블

  // dp 계산 (바텀 업 방식 = 작은 문제를 큰 문제로 확장)
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      let maxPrevCandy = 0; // 이전 칸의 사탕 중 가장 큰 값

      // 오른쪽, 아래, 오른쪽 대각선 아래로 이동해서 현재 칸에 도달할 수 있음
      // => 이전 칸은 현재 칸 기준 위, 왼쪽, 왼쪽 대각선 위 3개임
      // 이전 칸의 사탕은 dp에 저장되어 있음

      // 위쪽에서 내려온 경우 -> 이전 칸의 사탕은 (r - 1, c)
      if (r > 0) maxPrevCandy = Math.max(maxPrevCandy, dp[r - 1][c]);
      // 왼쪽에서 오른쪽으로 온 경우 -> 이전 칸의 사탕은 (r, c - 1)
      if (c > 0) maxPrevCandy = Math.max(maxPrevCandy, dp[r][c - 1]);
      // 왼쪽 위 대각선에서 온 경우 -> 이전 칸의 사탕은 (r - 1, c - 1)
      if (r > 0 && c > 0) {
        maxPrevCandy = Math.max(maxPrevCandy, dp[r - 1][c - 1]);
      }

      dp[r][c] = maxPrevCandy + maze[r][c]; // 현재 칸의 최대 사탕 개수를 dp에 저장
    }
  }

  // 모든 칸을 순회하면 dp의 마지막엔 최종 위치의 최대 사탕 합이 저장됨
  return dp[N - 1][M - 1];
};

const [N, M] = input.shift().split(' ').map(Number);
const maze = input.map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, maze));
