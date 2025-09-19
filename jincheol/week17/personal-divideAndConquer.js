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
 * 하나의 면을 좌표로 생각, 오른쪽이나 위쪽은 좌표가 증가
 * @param {number} d 사분면 조각 번호의 자리수
 * @param {string} blockNum 사분면 조각의 번호
 * @param {number} x 조각이 x축으로 이동하는 위치
 * @param {number} y 조각이 y축으로 이동하는 위치
 */
const solution = (d, blockNum, x, y) => {
  let originX = 0; // 사분면 조각의 x 좌표
  let originY = 0; // 사분면 조각의 y 좌표

  // 사분면 조각의 번호로 좌표 찾기
  let half = Math.pow(2, d - 1); // 사분면의 한 변의 길이 (첫 탐색을 위해 d - 1로 시작)

  // 번호를 순회하면서 위치를 1/4씩 범위를 찾아나간다.
  for (const num of blockNum) {
    switch (num) {
      // 우상
      case '1':
        originX += half; // 오른쪽 위면 왼쪽 절반만큼 더하기
        originY += half; // 오른쪽 위면 아래 절반만큼 더하기
        break;
      // 좌상
      case '2':
        originY += half; // 왼쪽 위면 아래 절반만큼 더하기
        break;
      // 좌하
      case '3': // 왼쪽 아래면 더하지 않아도 된다
        break;
      // 우하
      case '4':
        originX += half; // 오른쪽 아래면 왼쪽 절반만큼 더하기
        break;
    }

    // 사분면을 다시 4등분하기 (한 변의 길이는 1/2)
    half = Math.floor(half / 2);
  }

  // 원래 사분면 조각의 좌표에 이동하는 거리 더하기
  let afterX = originX + x;
  let afterY = originY + y;

  const size = Math.pow(2, d); // 전체 사분면의 한 변의 길이
  // 이동 후의 좌표가 전체 사분면을 벗어날 경우 -1
  if (afterX < 0 || afterY < 0 || afterX >= size || afterY >= size) return -1;

  let answer = ''; // 이동한 후의 좌표를 다시 번호로 변경하기 위한 문자열
  half = Math.pow(2, d - 1); // half 초기화

  // 이동한 후의 사분면 조각의 좌표를 다시 번호화 하기
  for (let i = 0; i < d; i++) {
    // 조각이 오른쪽 위에 위치할 때
    if (afterX >= half && afterY >= half) {
      answer += '1'; // 번호 추가
      afterX -= half; // 왼쪽 절반 빼주기
      afterY -= half; // 아래 절반 빼주기
    }
    // 조각이 오른쪽 위에 위치할 때
    else if (afterX < half && afterY >= half) {
      answer += '2'; // 번호 추가
      afterY -= half; // 아래 절반 빼주기
    }
    // 조각이 왼쪽 아래에 위치할 때
    else if (afterX < half && afterY < half) {
      answer += '3'; // 번호 추가, 좌표 변화 없음
    }
    // 조각이 오른쪽 아래에 위치할 때
    else {
      answer += '4'; // 번호 추가
      afterX -= half; // 왼쪽 절반 빼주기
    }

    half = Math.floor(half / 2); // 사분면을 다시 4등분 (한 변의 길이는 1/2)
  }

  return answer;
};

const [d, blockNum] = input.shift().split(' ');
const [x, y] = input.shift().split(' ').map(Number);
console.log(solution(parseInt(d), blockNum.trim(), x, y));
