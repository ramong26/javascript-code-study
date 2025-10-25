// 문제 링크: [기타리스트](https://www.acmicpc.net/problem/1495)

// 실행: node jincheol/week22/personal-dynamicProgramming.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week22/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 곡을 순회하면서 연주할 수 있는 볼륨들을 저장하기
 * @param {number} N 곡의 개수
 * @param {number} S 시작 볼륨
 * @param {number} M 최대 볼륨
 * @param {number[]} V 곡 별 변경할 수 있는 볼륨 값
 */
const solution = (N, S, M, V) => {
  // 곡을 순회하면서 연주할 수 있는 최대 볼륨을 1차원 배열 dp에 저장하는 방법을 시도했지만 실패

  // dp 테이블 -> 각 곡마다 연주할 수 있는 볼륨을 표시한 boolean 배열 형태
  const dp = Array.from({ length: N }, () => Array(M + 1).fill(false));
  const firstMin = S - V[0]; // 첫 곡의 최소 볼륨
  const firstMax = S + V[0]; // 첫 곡의 최대 볼륨
  if (firstMin < 0 && M < firstMax) return -1; // 첫 곡을 연주할 수 없을 때
  // 첫 곡의 dp 테이블 값
  if (firstMin >= 0) dp[0][firstMin] = true;
  if (firstMax <= M) dp[0][firstMax] = true;

  // 이후 곡들 순회
  for (let i = 1; i < N; i++) {
    const range = V[i]; // 현재 곡의 변경 볼륨
    let canPlay = false;
    // 전 곡의 dp 테이블 순회(전 곡의 볼륨 배열)
    for (let prev = 0; prev <= M; prev++) {
      // 전 곡의 볼륨을 순회 중 연주 가능한 볼륨일 때
      if (dp[i - 1][prev]) {
        const nextMin = prev - range; // 해당 볼륨으로부터 - 값
        // 연주 가능한 범위일 때
        if (nextMin >= 0) {
          dp[i][nextMin] = true; // 현재 곡의 dp 테이블 표시
          canPlay = true; // 연주 가능 여부
        }

        const nextMax = prev + range; // 해당 볼륨으로부터 + 값
        // 연주 가능한 범위일 때
        if (nextMax <= M) {
          dp[i][nextMax] = true; // 현재 곡의 dp 테이블 표시
          canPlay = true; // 연주 가능 여부
        }
      }
    }
    // 연주가 불가능할 때
    if (!canPlay) return -1;
  }

  // 마지막 곡의 볼륨을 최대값부터 순회
  for (let volume = M; volume >= 0; volume--) {
    const lastVolume = dp[N - 1][volume]; // 가능 여부 확인
    if (lastVolume) return volume;
  }

  return -1;
};

const [N, S, M] = input[0].split(' ').map(Number);
const V = input[1].split(' ').map(Number);
console.log(solution(N, S, M, V));
