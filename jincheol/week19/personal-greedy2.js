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
  /**
   * 스위치를 누르는 함수
   * @param {string[]} bulb 전구
   * @param {number} idx 누르는 스위치의 인덱스
   */
  const pressSwitch = (bulb, idx) => {
    // 현재 누르는 스위치의 왼쪽과 오른쪽도 포함
    for (let i = idx - 1; i <= idx + 1; i++) {
      // 누르는 스위치가 제일 왼쪽이나 오른쪽 스위치일 경우 없는 전구를 누르지 않기 위함
      if (i >= 0 && i < N) {
        bulb[i] = bulb[i] === '0' ? '1' : '0';
      }
    }
  };

  /**
   * 첫 전구를 누르는지 누르지 않는지 확인하여 누르는 횟수를 반환하는 함수
   * @param {boolean} pressFirst 첫 전구를 누르는지에 대한 여부
   * @param {string[]} bulb 전구 (복사본)
   * @returns 누르는 횟수 (Infinity는 만들 수 없는 경우이다.)
   */
  const getPressCount = (pressFirst, bulb) => {
    let pressCount = 0; // 누르는 횟수

    // 첫 전구를 누르는 경우
    if (pressFirst) {
      pressSwitch(bulb, 0); // 누르기
      pressCount++; // 횟수++
    }

    // 2번째 전구부터 순회
    for (let i = 1; i < N; i++) {
      const leftBulb = bulb[i - 1]; // 현재 전구의 왼쪽 전구
      const LeftTargetBulb = targetBulb[i - 1]; // 목표하는 전구의 왼쪽 전구
      // 왼쪽의 전구가 다를 경우
      if (leftBulb !== LeftTargetBulb) {
        pressSwitch(bulb, i); // 눌러서 왼쪽의 전구를 동일하게 변경
        pressCount++; // 횟수++
      }
    }

    // 모든 전구가 동일한지 확인
    for (let i = 0; i < N; i++) {
      // 다를 경우 Infinity를 반환하여 만들 수 없음을 표시
      // 만들 수 있는 횟수 중 최소 횟수를 반환을 위해 Math.min을 사용해야 하므로
      if (bulb[i] !== targetBulb[i]) return Infinity;
    }

    // 횟수 반환
    return pressCount;
  };

  const pressFirstCount = getPressCount(true, currentBulb.slice()); // 첫 전구를 누르는 경우
  const pressNotFirstCount = getPressCount(false, currentBulb.slice()); // 첫 전구를 누르지 않는 경우

  const answer = Math.min(pressFirstCount, pressNotFirstCount); // 두 경우의 횟수 중 최솟값 찾기

  // 최솟값이 만들 수 없는 경우(Infinity)면 -1 반환, 아니면 횟수 반환
  return answer === Infinity ? -1 : answer;
};

const N = parseInt(input.shift());
const [currentBulb, targetBulb] = input.map((v) => v.trim().split(''));
console.log(solution(N, currentBulb, targetBulb));
