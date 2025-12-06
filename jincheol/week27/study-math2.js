// 문제 링크: [이항 계수 2](https://www.acmicpc.net/problem/11051)

// 실행: node jincheol/week27/study-math2.js

/**
 * 이항 계수 = 순서를 고려하지 않고 N개의 서로 다른 원소 중에서 K개를 선택하는 경우의 수
 * @param {number} N 자연수
 * @param {number} K 정수
 */
const solution = (N, K) => {
  const dp = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0)); // dp 테이블

  // 파스칼 법칙
  // N개중 K개를 선택하는 경우의 수
  // 특정 원소 A를 반드시 포함하고 N - 1개 중에서 K - 1개를 선택하는 경우와
  // 특정 원소 A를 반드시 제외하고 나머지 N - 1개 중에서 K개를 선택하는 경우의 수의 합과 같다
  // = dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= i; j++) {
      // 기저 조건
      // 점화식은 i - 1에 의존하므로 가장 작은 값들은 직접 정의해야 함
      // j = 0 -> i개 중 0개를 선택하는 경우의 수 (1개)
      // i = j -> i개 중 i개를 선택하는 경우의 수 (1개)
      // j < 0 -> 음수 개수를 선택하는 경우의 수 (0개) -> for문 조건으로 만족
      // j > i -> i개 중 i개보다 많이 선택하는 경우의 수 (0개) -> for문 조건으로 만족
      if (j === 0 || i === j) dp[i][j] = 1; // 경우의 수 1개
      else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10_007; // 점화식을 10007로 나눈 나머지를 저장
      }
    }
  }

  return dp[N][K];
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
console.log(solution(N, K));
