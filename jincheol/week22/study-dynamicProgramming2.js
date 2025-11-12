// 문제 링크: [점프 점프](https://www.acmicpc.net/problem/11060)

// 실행: node jincheol/week22/study-dynamicProgramming2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week22/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 미로를 순서대로 이동 -> 갈 수 있는 칸에 최소 점프 거리 저장 -> 해당 칸의 최소 점프 거리와 현재 탐색과 비교 후 갱신
 * @param {number} N 미로의 가로 크기
 * @param {number[]} maze 미로의 구성
 */
const solution = (N, maze) => {
  const dp = new Array(N).fill(-1); // dp 테이블, -1로 초기화
  dp[0] = 0; // 첫 칸은 0

  // 미로 순회
  for (let i = 0; i < N; i++) {
    if (dp[i] === -1) continue; // 방문하지 않은 칸은 도달할 수 없는 칸

    const max = maze[i]; // 현재 칸에서 갈 수 있는 최대 거리
    // 다음 칸(+1)부터 최대 거리 칸까지 순회
    for (let n = 1; n <= max; n++) {
      const jump = i + n; // 점프해서 도착한 칸 (인덱스)
      if (jump >= N) break; // 도착한 칸이 미로 밖이면 종료

      const nextCount = dp[i] + 1; // 현재 칸에 도달했을 때 점프 횟수

      // 방문하지 않은 칸이면 dp 테이블 갱신
      if (dp[jump] === -1) dp[jump] = nextCount;
      // 방문했던 칸이면 최소 점프 거리로 갱신
      else dp[jump] = Math.min(dp[jump], nextCount);
    }
  }

  return dp.at(-1);
};

const N = parseInt(input[0]);
const maze = input[1].split(' ').map(Number);
console.log(solution(N, maze));
