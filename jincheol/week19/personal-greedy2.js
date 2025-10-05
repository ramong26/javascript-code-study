// 문제 링크: [전구와 스위치](https://www.acmicpc.net/problem/2138)

// 실행: node jincheol/week19/personal-greedy2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week19/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 누르는 스위치의 양 옆과 누른 전구가 켜지거나 꺼짐
 * @param {number} N 전구의 개수
 * @param {string[]} currentBulb 현재 전구의 상태
 * @param {string[]} targetBulb 목표하는 전구의 상태
 */
const solution = (N, currentBulb, targetBulb) => {
  const pressSwitch = (bulb, idx) => {
    for (let i = idx - 1; i <= idx + 1; i++) {
      if (i >= 0 && i < N) {
        bulb[i] = bulb[i] === '0' ? '1' : '0';
      }
    }
  };

  const getPressCount = (pressFirst, bulb) => {
    let pressCount = 0;

    if (pressFirst) {
      pressSwitch(bulb, 0);
      pressCount++;
    }

    for (let i = 1; i < N; i++) {
      const leftBulb = bulb[i - 1];
      const LeftTargetBulb = targetBulb[i - 1];
      if (leftBulb !== LeftTargetBulb) {
        pressSwitch(bulb, i);
        pressCount++;
      }
    }

    for (let i = 0; i < N; i++) {
      if (bulb[i] !== targetBulb[i]) return Infinity;
    }

    return pressCount;
  };

  const pressFirstCount = getPressCount(true, currentBulb.slice());
  const pressNotFirstCount = getPressCount(false, currentBulb.slice());

  const answer = Math.min(pressFirstCount, pressNotFirstCount);

  return answer === Infinity ? -1 : answer;
};

const N = parseInt(input.shift());
const [currentBulb, targetBulb] = input.map((v) => v.trim().split(''));
console.log(solution(N, currentBulb, targetBulb));
