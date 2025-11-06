// 문제 링크: [두 스티커](https://www.acmicpc.net/problem/16937)
// 실행: node jincheol/etc/bruteForce/bruteForce4.js

/**
 *
 * @param {number} H 모눈종이의 세로
 * @param {number} W 모눈종이의 가로
 * @param {number} N 스티커의 개수
 * @param {number[]} stickers 스티커의 크기
 */
const solution = (H, W, N, stickers) => {
  let max = 0; // 최대 넓이

  // 스티커 중 2개를 선택
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const [r1, c1] = stickers[i]; // 스티커 1
      const [r2, c2] = stickers[j]; // 스티커 2
      const area = r1 * c1 + r2 * c2; // 스티커 1, 2를 사용할 경우 면적

      // 두 스티커를 회전하는 경우 조합
      const rotations = [
        [r1, c1, r2, c2],
        [r1, c1, c2, r2],
        [c1, r1, r2, c2],
        [c1, r1, c2, r2],
      ];

      // 조합 순회
      for (const [row1, col1, row2, col2] of rotations) {
        // 가로로 나란히 배치하는 경우 배치 가능한지 확인
        if (col1 + col2 <= W && Math.max(row1, row2) <= H) {
          max = Math.max(max, area); // 최대 넓이 갱신
        }
        // 세로로 나란히 배치하는 경우 배치 가능한지 확인
        if (row1 + row2 <= H && Math.max(col1, col2) <= W) {
          max = Math.max(max, area); // 최대 넓이 갱신
        }
      }
    }
  }

  return max;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [H, W] = input[0].split(' ').map(Number);
const N = parseInt(input[1]);
const stickers = input.slice(2).map((v) => v.trim().split(' ').map(Number));
console.log(solution(H, W, N, stickers));
