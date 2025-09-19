// 문제 링크: [Z](https://www.acmicpc.net/problem/1074)

// 실행: node jincheol/week17/study-divideAndConquer2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week17/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 찾고자 하는 위치가 사분면으로 나눴을 때 어디 위치하는지 파악
 * @param {number} N
 * @param {number} r 행
 * @param {number} c 열
 */
const solution = (N, r, c) => {
  /**
   * 사분면으로 나눠 r행 c열 위치에 따라 이전에 방문하는 하나의 사분면을 더해나가는 재귀함수
   * @param {number} n 현재 사각형의 한 변의 길이를 구할 2의 n제곱
   * @param {number} r 목표하는 칸의 행
   * @param {number} c 목표하는 칸의 열
   * @returns {number} r행 c열의 방문 순서
   */
  const countBlock = (n, r, c) => {
    if (n === 0) return 0;

    const half = Math.pow(2, n - 1); // 사분면으로 나눴을 때 한 변의 길이
    const blockCount = half * half; // 사분면의 크기

    const isTopLeft = r < half && c < half; // 1 사분면일 때
    // (r, c)가 있는 사분면보다 먼저 방문하는 사분면이 없으니 n - 1하여 재귀호출
    if (isTopLeft) return countBlock(n - 1, r, c);

    const isTopRight = r < half && c >= half; // 2 사분면일 때
    // (r, c)가 있는 사분면보다 먼저 방문하는 사분면이 1개 있으니 blockCount를 더하고
    // 사분면 내에서의 열을 구하기 위해 c - half하여 재귀호출
    if (isTopRight) return blockCount + countBlock(n - 1, r, c - half);

    const isBottomLeft = r >= half && c < half; // 3 사분면일 때
    // (r, c)가 있는 사분면보다 먼저 방문하는 사분면이 2개 있으니 blockCount * 2를 더하고
    // 사분면 내에서의 행을 구하기 위해 r - half하여 재귀호출
    if (isBottomLeft) return blockCount * 2 + countBlock(n - 1, r - half, c);

    // 4 사분면일 때 blockCount * 3를 더하고 사분면 내의 행과 열을 구하기 위해 r - half, c - half하여 재귀호출
    return blockCount * 3 + countBlock(n - 1, r - half, c - half);
  };

  const answer = countBlock(N, r, c); // 재귀호출 시작

  return answer;
};

const [N, r, c] = input[0].split(' ').map(Number);
console.log(solution(N, r, c));
