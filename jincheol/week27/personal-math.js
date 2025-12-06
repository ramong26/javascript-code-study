// 문제 링크: [피보나치 수 2](https://www.acmicpc.net/problem/2748)

// 실행: node jincheol/week27/personal-math.js

/**
 *
 * @param {number} N 구해야 하는 N번째 피보나치 수
 */
const solution = (N) => {
  const fibo = new Array(N + 1).fill(0n); // 피보나치 수를 저장할 배열 BigInt 사용
  fibo[1] = 1n; // 1번째 피보나치 수는 1

  // 0번째 피보나치 수는 0, 1번째는 1이므로 2번째 수부터 계산
  for (let i = 2; i <= N; i++) {
    const before1 = fibo[i - 2]; // 전전 수
    const before2 = fibo[i - 1]; // 전 수
    const current = before1 + before2; // i번째 피보나치 수
    fibo[i] = current; // 값 할당
  }

  return fibo[N].toString(); // N번째 피보나치 수 반환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
console.log(solution(N));
