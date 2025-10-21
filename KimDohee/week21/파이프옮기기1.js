/* 브루트포스 - 파이프 옮기기1(https://www.acmicpc.net/problem/17070)
- 파이프 방향 (0: 가로, 1: 세로, 2: 대각선)
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const board = lines.slice(1).map((line) => line.split(' ').map(Number));

  // 파이프 방향 상수
  const HORIZONTAL = 0;  // 가로
  const VERTICAL = 1;  // 세로
  const DIAGONAL = 2;  // 대각선

  // 방향별 이동 가능한 다음 방향
  // [다음 행 증가량, 다음 열 증가량, 다음 방향]
  const moves = [
    [[0, 1, HORIZONTAL], [1, 1, DIAGONAL]],
    [[1, 0, VERTICAL], [1, 1, DIAGONAL]],
    [[0, 1, HORIZONTAL], [1, 0, VERTICAL], [1, 1, DIAGONAL]]
  ];

  function canMove(r, c, nextDirection) {
    // 이동 가능 여부 체크
    if (r < 0 || r >= N || c < 0 || c >= N) return false;
    if (board[r][c] === 1) return false;

    // 대각선은 세칸을 확인해야함
    if (nextDirection === DIAGONAL) {
      // (r-1, c), (r, c-1), (r, c) 모두 빈 칸이어야 함
      if (board[r-1][c] === 1 || board[r][c-1] === 1) {
        return false;
      }
    }

    return true;
  }

  function dfs(r, c, direction) {
    // 종료조건: 파이프 끝이 (N-1, N-1)에 도달
    if (r === N-1 && c === N-1) {
      return 1;
    }

    let count = 0;

    // 현재 방향에서 가능한 모든 이동 시도
    for (const [dr, dc, nextDirection] of moves[direction]) {
      const nr = r + dr;
      const nc = c + dc;

      // 이동 가능한지 체크
      if (canMove(nr, nc, nextDirection)) {
        count += dfs(nr, nc, nextDirection);
      }
    }
    return count;
  }
  return dfs(0, 1, HORIZONTAL);
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));