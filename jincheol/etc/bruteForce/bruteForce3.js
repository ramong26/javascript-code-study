// 문제 링크: [양념 반 후라이드 반](https://www.acmicpc.net/problem/16917)
// 실행: node jincheol/etc/bruteForce/bruteForce3.js

/**
 *
 * @param {number} A 양념 한 마리 가격
 * @param {number} B 후라이드 한 마리 가격
 * @param {number} C 반반 한 마리 가격
 * @param {number} X 구매할 양념의 최소 마리
 * @param {number} Y 구매할 후라이드의 최소 마리
 */
const solution = (A, B, C, X, Y) => {
  let cost = X * A + Y * B; // 각각 구매했을 때 가격

  const banban = Math.min(X, Y); // 반반으로 구매할 수 있는 최소 마리
  let banbanCost = 2 * banban * C; // 반반을 통해 구매했을 때 가격
  const restRed = X - banban; // 반반으로 구매하고 남은 양념
  const restFride = Y - banban; // 반반으로 구매하고 남은 후라이드

  banbanCost += restRed * Math.min(A, 2 * C); // 남은 양념 구매
  banbanCost += restFride * Math.min(B, 2 * C); // 남은 후라이드 구매

  cost = Math.min(cost, banbanCost); // 가격 비교 후 갱신

  return cost;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [A, B, C, X, Y] = input[0].split(' ').map(Number);
console.log(solution(A, B, C, X, Y));
