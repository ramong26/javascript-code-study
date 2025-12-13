// 문제 링크: [BOJ 거리](https://www.acmicpc.net/problem/12026)

// 실행: node jincheol/week29/personal-dynamicProgramming2.js

/**
 *
 * @param {number} N 보도블록의 개수
 * @param {string} blocks 보도블록
 */
const solution = (N, blocks) => {
  const dp = new Array(N).fill(Infinity); // dp 테이블, 최소 에너지를 구해야하기에 Infinity로 초기화
  dp[0] = 0; // 시작 보도블록 초기화

  const isValidBlock = (cur, next) => {
    if (cur === 'B' && next === 'O') return true;
    if (cur === 'O' && next === 'J') return true;
    if (cur === 'J' && next === 'B') return true;
    return false;
  };

  // dp 계산, i가 도착 지점
  for (let i = 1; i < N; i++) {
    // i번째 보도블록 이전의 모든 블록들 j
    for (let j = 0; j < i; j++) {
      const next = blocks[i]; // 다음 블록
      const cur = blocks[j]; // 현재 블록

      // j번째 블록에서 i까지 도달 가능한지 확인 + BOJ 순서 만족 확인
      if (dp[j] !== Infinity && isValidBlock(cur, next)) {
        const dist = i - j; // 점프 거리
        const energy = dist * dist; // 필요한 에너지

        dp[i] = Math.min(dp[i], dp[j] + energy); // 최소 에너지 갱신
      }
    }
  }

  // 가능 여부 확인 후 return
  return dp.at(-1) === Infinity ? -1 : dp.at(-1);
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const blocks = input[1];
console.log(solution(N, blocks));
