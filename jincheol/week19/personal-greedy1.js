// 문제 링크: [행렬](https://www.acmicpc.net/problem/1080)

// 실행: node jincheol/week19/personal-greedy1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week19/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 행렬의 행 개수
 * @param {number} M 행렬의 열 개수
 * @param {string[][]} A 행렬 A
 * @param {string[][]} B 행렬 B
 */
const solution = (N, M, A, B) => {
  if (N < 3 || M < 3) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (A[r][c] !== B[r][c]) return -1;
      }
    }
    return 0;
  }
  /**
   *
   * @param {number} r 뒤집을 row 시작 index
   * @param {number} c 뒤집을 col 시작 index
   */
  const flipBox = (r, c) => {
    for (let row = r; row < r + 3; row++) {
      for (let col = c; col < c + 3; col++) {
        A[row][col] = A[row][col] === '0' ? '1' : '0';
      }
    }
  };

  let flipCount = 0;
  for (let r = 0; r < N - 2; r++) {
    for (let c = 0; c < M - 2; c++) {
      if (A[r][c] !== B[r][c]) {
        flipBox(r, c);
        flipCount++;
      }
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = M - 2; c < M; c++) {
      if (A[r][c] !== B[r][c]) return -1;
    }
  }

  for (let r = N - 2; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (A[r][c] !== B[r][c]) return -1;
    }
  }

  return flipCount;
};

const [N, M] = input.shift().split(' ').map(Number);
const A = input.splice(0, N).map((v) => v.trim().split(''));
const B = input.map((v) => v.trim().split(''));
console.log(solution(N, M, A, B));
