// 다이나믹 프로그래밍 - 이동하기(https://www.acmicpc.net/problem/11048)

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);

  const maze = Array(N + 1).fill(null).map(() => Array(M + 1).fill(0));  // 각 방의 사탕 개수
  const dp  = Array(N + 1).fill(null).map(() => Array(M + 1).fill(0));  // 해당 위치까지 모은 누적 사탕

  // 미로 입력 받기
  for (let i = 1; i <= N; i++) {
    const row = lines[i].split(' ').map(Number);
    for (let j = 1; j <= M; j++) {
      maze[i][j] = row[j-1];
    }
  }

  // DP
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      dp[i][j] = maze[i][j] + Math.max(
        dp[i-1][j],
        dp[i][j-1],
        dp[i-1][j-1]
      );
    }
  }
  return dp[N][M];
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));