// 문제 링크: [동전 1](https://www.acmicpc.net/problem/2293)

// 실행: node jincheol/week23/study-dynamicProgramming3.js

/**
 * 0원부터 k원까지 작은 가치부터 만들 수 있는 경우의 수를 구해나감
 * @param {number} n 동전의 개수
 * @param {number} k 목표하는 동전의 합
 * @param {number[]} coins 동전의 가치
 */
const solution = (n, k, coins) => {
  const dp = new Array(k + 1).fill(0); // dp 테이블 (dp[i] = 만드는 경우의 수)
  dp[0] = 1; // 0원은 1가지 (아무것도 선택하지 않는)

  // 동전 순회
  for (let coin of coins) {
    // 해당 동전을 사용한 가치 ~ 최대 가치 순회
    for (let value = coin; value <= k; value++) {
      // coin 가치를 더해서 value원을 만들려면, 그 전에 이미 value - coin원을 만들 수 있는 모든 경우의 수에 현재 동전 coin을 하나씩 추가하는 경우
      // 기존 value원을 만드는 경우에 새로운 동전을 사용해서 value원을 만드는 경우의 수를 누적해서 더하기
      dp[value] += dp[value - coin];
    }
  }

  return dp.at(k);
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input4.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);
console.log(solution(n, k, coins));
