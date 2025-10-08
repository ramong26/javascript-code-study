// 침투 (https://www.acmicpc.net/problem/13565)

function solution(input) {
  const lines = input.trim().split('\n');
  const [M, N] = lines[0].split(' ').map(Number);
  const grid = [];

  for (let i = 1; i <= M; i++) {
    grid.push(lines[i].split('').map(Number));
  }

  const visited = Array.from({ length: M }, () => Array(N).fill(false));

  // DFS 함수
  const dfs = (row, col) => {
    // 종료 조건
    if (row === M - 1) return true;

    // 방문 처리
    visited[row][col] = true;

    // 4방향 탐색
    const move = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (const [x, y] of move) {
      const newRow = row + x;
      const newCol = col + y;

      if (newRow < 0 || newRow >= M || newCol < 0 || newCol >= N) {
        continue;
      }
      if (visited[newRow][newCol] || grid[newRow][newCol] === 1) {
        continue;
      }

      if (dfs(newRow, newCol)) {
        return true;
      }
    }

    return false;
  }

  for (let col = 0; col < N; col++) {
    if (grid[0][col] === 0 && !visited[0][col]) {
      if (dfs(0, col)) {
        return "YES";
      }
    }
  }
  return "NO";
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));