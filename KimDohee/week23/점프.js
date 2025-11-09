/*
DP - 점프(https://www.acmicpc.net/problem/1890)
N×N 게임판에서 가장 왼쪽 위칸에서 오른쪽 아래 칸으로 점프해서 이동할수 있는 경로의 개수를 구하기
- 각 칸에 적혀있는 수는 현재 칸에서 갈 수 있는 거리
- 반드시 오른쪽이나 아래로만 이동해야 한다.
- 0을 만나면 더이상 진행x
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);
  const board = lines.slice(1).map(line => line.split(' ').map(Number));

  const dp = Array.from({length: n}, () => Array(n).fill(0n));

  dp[0][0] = 1n;  // 시작점 초기화

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dp[i][j] === 0n) continue;

      let current = board[i][j];

      if (current === 0) continue;

      if (i + current < n) dp[i + current][j] += dp[i][j];  // 아래
      if (j + current < n) dp[i][j + current] += dp[i][j];  // 오른쪽
    }
  }

  return dp[n-1][n-1].toString();
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));