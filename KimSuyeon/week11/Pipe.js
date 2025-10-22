// https://www.acmicpc.net/problem/17070
// 파이프 옮기기 1

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('./KimSuyeon/week11/input1.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

const N = parseInt(input[0]); // 집의 크기 36칸
const board = [[]]; // board 배열 생성
for (let i = 1; i <= N; i++) {
  board[i] = [0, ...input[i].split(' ').map(Number)];
}

function solution(N, board) {
  // 메모 배열 생성 -> 가로 세로 대각선 -1 초기화
  const memo = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => [-1, -1, -1])
  );

  // dfs이용
  function dfs(r, c, dir) {
    // 도착지점에 도달했을 때
    if (r === N && c === N) return 1;
    // 범위 벗어날 때
    if (r > N || c > N) return 0;
    // -1이 아님 -> 방문함 => 이미 방문을 했으면 해당 memo에 저장된 값 그대로 반환
    if (memo[r][c][dir] !== -1) return memo[r][c][dir];

    let count = 0;

    // 현재 파이프가 가로 방향일 때 (가로 = 0, 세로 = 1, 대각선 = 2)
    if (dir === 0) {
      // → 이동
      if (c + 1 <= N && board[r][c + 1] === 0) {
        count += dfs(r, c + 1, 0);
      }
      // ↘ 이동
      if (
        r + 1 <= N &&
        c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        count += dfs(r + 1, c + 1, 2);
      }
    } else if (dir === 1) {
      // ↓ 이동
      if (r + 1 <= N && board[r + 1][c] === 0) {
        count += dfs(r + 1, c, 1);
      }
      // ↘ 이동
      if (
        r + 1 <= N &&
        c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        count += dfs(r + 1, c + 1, 2);
      }
    } else {
      // → 이동
      if (c + 1 <= N && board[r][c + 1] === 0) {
        count += dfs(r, c + 1, 0);
      }
      // ↓ 이동
      if (r + 1 <= N && board[r + 1][c] === 0) {
        count += dfs(r + 1, c, 1);
      }
      // ↘ 이동
      if (
        r + 1 <= N &&
        c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        count += dfs(r + 1, c + 1, 2);
      }
    }

    // 계산한 결과를 저장함
    // dfs(3, 4, 0)을 처음 호출 → count = 10 계산 → memo[3][4][0] = 10 저장 -> dfs(3, 4, 0)을 또 호출 → memo[3][4][0] !== -1이므로 계산 없이 바로 10 반환
    memo[r][c][dir] = count;
    return count;
  }

  // 여기서부터 시작
  return dfs(1, 2, 0);
}
console.log(solution(N, board));

// input 예시
// 6
// 0 0 0 0 0 0
// 0 1 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
