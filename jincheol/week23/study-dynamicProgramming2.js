// 문제 링크: [점프](https://www.acmicpc.net/problem/1890)

// 실행: node jincheol/week23/study-dynamicProgramming2.js

/**
 * 게임 판을 순회하면서 현재 칸에서 이동할 수 있는 경로에 현재 칸까지 도착하는 경우의수를 더해주기
 * @param {number} N 게임 판의 크기
 * @param {number[][]} board 게임 판의 구성
 * @returns
 */
const solution = (N, board) => {
  const dp = Array.from({ length: N }, () => new Array(N).fill(0n)); // BigInt를 사용하지 않으면 마지막에 틀림
  dp[0][0] = 1n;

  // 게임 판 순회
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // 마지막 칸에 도착했을 때 계산을 하면 move는 0임. 따라서 아래 계산에서 정답 * 3이 된다.
      if (r === N - 1 && c === N - 1) continue;

      const currentPath = dp[r][c]; // 현재 칸에 도달 가능한 경우의 수
      if (currentPath === 0n) continue; // 0이면 건너뛰기

      const move = board[r][c]; // 현재 칸에서 점프할 수 있는 거리
      const nr = r + move; // 아래로 점프할 때 도착 row index
      if (nr < N) dp[nr][c] += currentPath; // 도착 칸에 경우의 수 누적

      const nc = c + move; // 오른쪽으로 점프할 때 도착 col index
      if (nc < N) dp[r][nc] += currentPath; // 도착 칸에 경우의 수 누적
    }
  }

  return dp.at(-1).at(-1).toString(); // 마지막 칸의 경우의 수 BigInt를 String으로 변환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = parseInt(input.shift());
const board = input.map((v) => v.split(' ').map(Number));
console.log(solution(N, board));
