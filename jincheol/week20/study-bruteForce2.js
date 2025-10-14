// 문제 링크: [등차수열 변환](https://www.acmicpc.net/problem/17088)

// 실행: node jincheol/week20/study-bruteForce2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week20/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 수열의 크기
 * @param {number[]} numbers 수열
 */
const solution = (N, numbers) => {
  if (N < 3) return 0;

  const range = [0, -1, 1]; // 수열의 숫자 변환 범위

  let answer = Infinity;

  // 수열의 1, 2번째 숫자들을 변환하여 등차 순환 (9가지 경우)
  for (const r1 of range) {
    for (const r2 of range) {
      const num1 = numbers[0] + r1; // 1번째 숫자 변환
      const num2 = numbers[1] + r2; // 2번째 숫자 변환
      const rawGap = num2 - num1; // 등차

      let canChange = true; // 이후 변환 가능한지
      let prevNum = num2; // 비교할 이전 숫자
      let changeCount = 0; // 변환 횟수
      // 변환 범위 숫자가 0이 아니면 횟수 증가
      if (r1 !== 0) changeCount++;
      if (r2 !== 0) changeCount++;
      // 이후 숫자들 확인

      // 1, 2번째 숫자들을 제외한 이후 숫자들 탐색
      for (let i = 2; i < N; i++) {
        const expectNum = prevNum + rawGap; // 기대 숫자
        const curNum = numbers[i]; // 현재 숫자
        const gap = curNum - expectNum; // 현재 숫자와 기대 숫자의 차

        // 차가 1초과일 경우 (변환 범위를 초과했을 때 = 불가)
        if (Math.abs(gap) > 1) {
          canChange = false; // 불가능 표시
          break; // 탐색 종료
        }

        // 차가 1 이하일 경우
        if (gap !== 0) changeCount++; // 차가 0이 아니면 1 또는 -1을하여 변환했기에 카운트
        prevNum = expectNum; // 다음 비교를 위해 이전 숫자 갱신
      }

      // 현재 등차가 변환 가능할 때 최소 변환 횟수 갱신
      if (canChange) answer = Math.min(answer, changeCount);
    }
  }

  return answer === Infinity ? -1 : answer;
};

const N = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);
console.log(solution(N, numbers));
