/*
BFS - 아기 상어 2 (https://www.acmicpc.net/problem/17086)
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);  // 공간의 크기
  
  const board = [];
  const queue = [];
  const distance = Array.from({ length: N }, () => Array(M).fill(-1));

  for (let i = 0; i < N; i++) {
    const row = lines[i + 1].split(' ').map(Number);
    board.push(row);

    for (let j = 0; j < M; j++) {
      if (row[j] === 1) {
        // 상어가 있으면 
        queue.push([i, j]);  // 행,열 queue에 넣음
        distance[i][j] = 0;  // 거리 0으로 초기화
      }
    }
  }

  // 이동 방향
  const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dy = [0, 1, 1, 1, 0, -1, -1, -1];
  

  // BFS
  
  while (queue.length > 0) {
    const [x, y] = queue.shift();   // 큐에서 꺼내기

    for (let i = 0; i < 8; i++) {  // 8방향 탐색
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && distance[nx][ny] === -1) {
        distance[nx][ny] = distance[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  // 안전 거리의 최댓값 찾기
  let maxDistance = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      maxDistance = Math.max(maxDistance, distance[i][j]);
    }
  }

  return maxDistance;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));