/**
 * 분할정복 - Z (https://www.acmicpc.net/problem/1074)
 * 2^N × 2^N 배열을 Z모양으로 탐색할 때 r행 c열을 몇번째로 방문하는지 구하기
 */

function solution(input) {
  const [N, r, c] = input.split(' ').map(Number);

  const find = (n, row, col) => {
    // 1 * 1 크기일 때
    if (n === 0) {
      return 0;
    }

    // 4등분 했을 때 사분면의 절반 지점
    const half = 2 ** (n - 1);

    // 한 사분면의 크기 (= 칸의 개수)
    const oneBlock = half * half;

    // (row, col)이 어느 사분면에 있는지 확인
    if (row < half && col < half) {
      return find(n - 1, row, col);  // 1사분면
    } else if (row < half && col >= half) {  // 2사분면
      return oneBlock + find(n - 1, row, col - half);
    } else if (row >= half && col < half) {  // 3사분면
      return 2 * oneBlock + find(n - 1, row - half, col);
    } else {  // 4사분면
      return 3 * oneBlock + find(n - 1, row - half, col - half);
    }
  }
  return find(N, r, c);
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));