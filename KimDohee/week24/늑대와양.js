/*
BFS - 늑대와 양(https://www.acmicpc.net/problem/16956)
크기가 R×C인 목장이 있고, 목장은 1×1 크기의 칸으로 나누어져 있다. 각각의 칸에는 비어있거나, 양 또는 늑대가 있다. 양은 이동하지 않고 위치를 지키고 있고, 늑대는 인접한 칸을 자유롭게 이동할 수 있다. 두 칸이 인접하다는 것은 두 칸이 변을 공유하는 경우이다.
목장에 울타리를 설치해 늑대가 양이 있는 칸으로 갈 수 없게 하려고 한다. 늑대는 울타리가 있는 칸으로는 이동할 수 없다. 울타리를 설치해보자.
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [r, c] = lines[0].split(' ').map(Number);  // 목장의 크기
  const board = [];  // 목장의 상태

  for (let i = 0; i < r; i++) {
    const row = lines[i + 1].split('');
    board.push(row);
  }

  // 늑대 주변에 울타리 설치 - 늑대의 상하좌우 빈칸을 울타리로 변경
  const dy = [0, 1, 0, -1]
  const dx = [1, 0, -1, 0]

  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      if (board[y][x] === 'W') {
        // 양 주변 4방향 체크
        for  (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny < 0 || ny >= r || nx < 0 || nx >= c) continue;

          // 양 바로 옆이면 불가능
          if (board[ny][nx] === 'S') return '0';

          // 빈칸이면 울타리 설치
          if (board[ny][nx] === '.') {
            board[ny][nx] = 'D';
          }
        }
      }
    }
  }

  // 모든 늑대의 위치에서 BFS 시작, 양에게 도달 가능한지 검증
  const queue = [];
  const visited = Array.from({ length: r }, () => Array(c).fill(false));

  // 모든 늑대 위치를 큐에 추가
  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      if (board[y][x] === 'W') {
        queue.push([y, x]);
        visited[y][x] = true;
      }
    }
  }

  let idx = 0;
  while (idx < queue.length) {
    const [y, x] = queue[idx++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      // 범위 체크
      if (ny < 0 || ny >= r || nx < 0 || nx >= c) continue;
      // 방문/울타리 체크
      if (visited[ny][nx] || board[ny][nx] === 'D') continue;

      // 양을 만나면 실패 (울타리 검증 실패)
      if (board[ny][nx] === 'S') return '0';

      // 빈칸 계속 탐색
      visited[ny][nx] = true;
      queue.push([ny, nx]);
    }
  }

  let result = '1\n';
  for (let i = 0; i < r; i++) {
    result += board[i].join('') + '\n';
  }
  return result;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));