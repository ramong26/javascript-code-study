// 다이나믹 프로그래밍 - 점프 점프(https://www.acmicpc.net/problem/11060)

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const A = lines[1].split(' ').map(Number);

  const dp = new Array(N).fill(Infinity);
  dp[0] = 0;

  // DP
  for (let i = 0; i < N; i++) {
    if (dp[i] === Infinity) continue;  // 도달할수 없으면 건너뜀

    // 현재칸에서 점프 가능한 칸 탐색
    for (let j = 1; j <= A[i] && i + j < N; j++) {
      // 더 적은 횟수로 갱신
      dp[i+j] = Math.min(dp[i+j], dp[i] + 1);
    }
  }
  return dp[N - 1] === Infinity ? -1 : dp[N - 1];
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));