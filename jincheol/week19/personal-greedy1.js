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
  // 행이나 열이 3미만이면 뒤집을 수 없으니 같은지 확인
  if (N < 3 || M < 3) {
    // 모든 원소를 순회
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        // 다른 원소가 존재하면 -1
        if (A[r][c] !== B[r][c]) return -1;
      }
    }
    return 0; // 모두 같은 원소면 0
  }
  /**
   *
   * @param {number} r 뒤집을 row 시작 index
   * @param {number} c 뒤집을 col 시작 index
   */
  const flipBox = (r, c) => {
    // 뒤집을 시작 row와 col index부터 +3까지 순회하면서 뒤집기
    for (let row = r; row < r + 3; row++) {
      for (let col = c; col < c + 3; col++) {
        A[row][col] = A[row][col] === '0' ? '1' : '0';
      }
    }
  };

  let flipCount = 0; // 뒤집은 횟수
  // 우측, 하단의 -2 까지 순회하며 3x3 뒤집기 (3x3으로 뒤집어야 해서 -2)
  for (let r = 0; r < N - 2; r++) {
    for (let c = 0; c < M - 2; c++) {
      // 현재 위치의 원소가 다르면 뒤집기
      if (A[r][c] !== B[r][c]) {
        flipBox(r, c); // 뒤집기
        flipCount++; // 카운트++
      }
    }
  }

  // 검증 (좌상단부터 우측 2열, 하단 2행을 제외하고는 같은 원소가 되도록 뒤집었기에 나머지만 확인)
  // 우측 2개의 열의 원소들을 순회하며 다른지 확인
  // 모든 행을 순회
  for (let r = 0; r < N; r++) {
    // 우측 2열만 순회
    for (let c = M - 2; c < M; c++) {
      // 현재 위치의 원소가 다르면 -1
      if (A[r][c] !== B[r][c]) return -1;
    }
  }

  // 하단 2개의 행의 원소들을 순회하며 다른지 확인
  // 하단 2행만 순회
  for (let r = N - 2; r < N; r++) {
    // 모든 열 순회
    for (let c = 0; c < M; c++) {
      // 현재 위치의 원소가 다르면 -1
      if (A[r][c] !== B[r][c]) return -1;
    }
  }

  // 원소가 모두 같은 경우 = A를 B로 바꿀 수 있는 경우
  return flipCount; // 뒤집은 횟수 반환
};

const [N, M] = input.shift().split(' ').map(Number);
const A = input.splice(0, N).map((v) => v.trim().split(''));
const B = input.map((v) => v.trim().split(''));
console.log(solution(N, M, A, B));
