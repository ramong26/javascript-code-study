// 바닥장식 - DFS (https://www.acmicpc.net/problem/1388)
// 직사각형 모양의 방을 ‘-’와 ‘|’로 이루어진 바닥 장식 모양으로 장식하는데 필요한 나무 판자의 개수 구하기. 만약 두개의 ‘-’, ‘|’가 인접해 있고 같은 행, 열에 있다면 같은 나무 판자이다.

function solution(input) {
  const lines = input.trim().split('\n');
  const [n, m] = lines[0].split(' ').map(Number);
  const board = lines.slice(1);
  // console.log(board);

  let visited = Array(n).fill().map(() => Array(m).fill(false));  //
  let count = 0;

  const dfs = (x, y) => {
    visited[x][y] = true;  // 방문 처리
    const current = board[x][y];  // 현재 위치

    // 다음 탐색 방향 결정
    if (current === '-') {
      // '-'는 좌우이동
      // 오른쪽
      if (y + 1 < m && !visited[x][y + 1] && board[x][y + 1] === '-') {
        dfs(x, y + 1);
      }

      // 왼쪽
      let leftY = y - 1;
      if (y - 1 >= 0 && !visited[x][y - 1] && board[x][y - 1] === '-') {
        dfs(x, y - 1);
      }
    }
    else if (current === '|') {
      // '|'는 상하 이동
      // 아래쪽 - x 증가
      let downX = x + 1;
      if (x + 1 < n && !visited[x + 1][y] && board[x + 1][y] === '|')  {
        dfs(x + 1, y);
      }

      // 위쪽 - x 감소
      let upX = x - 1;
      if (x - 1 >= 0 && !visited[x - 1][y] && board[x - 1][y] === '|') {
        dfs(x - 1, y);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j]) {
        dfs(i, j);
        count++;
      }
    }
  }
  return count;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));