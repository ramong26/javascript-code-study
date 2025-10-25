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

  const dp = Array.from({ length: N }, () => Array(M + 1).fill(false));
  const firstMin = S - V[0];
  const firstMax = S + V[0];
  if (firstMin < 0 && M < firstMax) return -1;
  if (firstMin >= 0) dp[0][firstMin] = true;
  if (firstMax <= M) dp[0][firstMax] = true;

  for (let i = 1; i < N; i++) {
    const range = V[i];
    let canPlay = false;

    for (let prev = 0; prev <= M; prev++) {
      if (dp[i - 1][prev]) {
        const nextMin = prev - range;
        if (nextMin >= 0) {
          dp[i][nextMin] = true;
          canPlay = true;
        }

        const nextMax = prev + range;
        if (nextMax <= M) {
          dp[i][nextMax] = true;
          canPlay = true;
        }
      }
    }

    if (!canPlay) return -1;
  }

  for (let volume = M; volume >= 0; volume--) {
    const lastVolume = dp[N - 1][volume];
    if (lastVolume) return volume;
  }

  return -1;
};

const [N, S, M] = input[0].split(' ').map(Number);
const V = input[1].split(' ').map(Number);
console.log(solution(N, S, M, V));
