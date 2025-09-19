// 문제 링크: [사분면](https://www.acmicpc.net/problem/1891)

// 실행: node jincheol/week17/personal-divideAndConquer.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week17/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 하나의 면을 좌표로 생각
 * @param {number} d 사분면 조각 번호의 자리수
 * @param {string} blockNum 사분면 조각의 번호
 * @param {number} x 조각이 x축으로 이동하는 위치
 * @param {number} y 조각이 y축으로 이동하는 위치
 */
const solution = (d, blockNum, x, y) => {
  const size = Math.pow(2, d);
  let originX = 0;
  let originY = 0;

  let half = Math.pow(2, d - 1);
  for (const num of blockNum) {
    switch (num) {
      case '1':
        originX += half;
        originY += half;
        break;
      case '2':
        originY += half;
        break;
      case '3':
        break;
      case '4':
        originX += half;
        break;
    }

    half = Math.floor(half / 2);
  }

  let afterX = originX + x;
  let afterY = originY + y;

  if (afterX < 0 || afterY < 0 || afterX >= size || afterY >= size) return -1;

  let answer = '';

  half = Math.pow(2, d - 1);

  for (let i = 0; i < d; i++) {
    if (afterX >= half && afterY >= half) {
      answer += '1';
      afterX -= half;
      afterY -= half;
    } else if (afterX < half && afterY >= half) {
      answer += '2';
      afterY -= half;
    } else if (afterX < half && afterY < half) {
      answer += '3';
    } else {
      answer += '4';
      afterX -= half;
    }

    half = Math.floor(half / 2);
  }

  return answer;
};

const [d, blockNum] = input.shift().split(' ');
const [x, y] = input.shift().split(' ').map(Number);
console.log(solution(parseInt(d), blockNum.trim(), x, y));
