// 문제 링크: [에너지 모으기](https://www.acmicpc.net/problem/16198)

// 실행: node jincheol/week11/study-bruteForce1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week11/input1.txt')
  .toString()
  .trim()
  .split('\n');

const N = parseInt(input[0]);
const marbles = input[1].split(' ').map(Number);

let energy = 0; // 최종 에너지

/**
 *
 * @param {number[]} curMarbles 현재 구슬 배열
 * @param {number} curEnergy 현재 에너지 합
 * @returns
 */
const dfs = (curMarbles, curEnergy) => {
  // 첫 번째와 마지막 구슬은 선택할 수 없으니 길이가 2일 때 종료
  if (curMarbles.length === 2) {
    energy = Math.max(energy, curEnergy); // 최댓값 계산
    return;
  }

  // 첫 번째와 마지막 구슬을 제외하기 위한 조건
  for (let i = 1; i < curMarbles.length - 1; i++) {
    const leftMarbles = curMarbles.slice(0, i); // 선택한 구슬 기준 왼쪽 구슬들
    const rightMarbles = curMarbles.slice(i + 1); // 선택한 구슬 기준 오른쪽 구슬들
    const newMarbles = leftMarbles.concat(rightMarbles); // 선택 구슬을 제외한 나머지 구슬들

    // 에너지 합 (현재 에너지 + 왼쪽 * 오른쪽)
    const newEnergy = curEnergy + curMarbles[i - 1] * curMarbles[i + 1];
    dfs(newMarbles, newEnergy); // 재귀 호출
  }
};

dfs(marbles, 0);

console.log(energy);
