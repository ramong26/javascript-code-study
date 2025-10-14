/**
 * 브루트포스 - 숫자판 점프
 * 5×5 크기의 숫자판이 있다. 각각의 칸에는 숫자(digit, 0부터 9까지)가 적혀 있다. 이 숫자판의 임의의 위치에서 시작해서, 인접해 있는 네 방향으로 다섯 번 이동하면서, 각 칸에 적혀있는 숫자를 차례로 붙이면 6자리의 수가 된다. 이동을 할 때에는 한 번 거쳤던 칸을 다시 거쳐도 되며, 0으로 시작하는 000123과 같은 수로 만들 수 있다.
숫자판이 주어졌을 때, 만들 수 있는 서로 다른 여섯 자리의 수들의 개수를 구하는 프로그램을 작성하시오.
 */

function solution(input) {
  const board = input.trim().split('\n').map(line => line.split(' ').map(Number));

  const result = new Set();  // 중복 방지

  // 상하좌우 이동
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // DFS로 경로탐색
  function dfs(x, y, depth, number) {
    if (depth === 6) {
      result.add(number);
      return;
    }

    // 이동
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
        // 다음 칸의 숫자를 붙여서 재귀 호출
        dfs(nx, ny, depth +1, number + board[nx][ny]);
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      dfs(i, j, 1, String(board[i][j]));  // 0으로 시작되는 숫자도 가능하기 때문에 문자열
    }
  }

  return result.size;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));