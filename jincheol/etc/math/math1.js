// 문제 링크: [피보나치 수 3](https://www.acmicpc.net/problem/2749)
// 실행: node jincheol/etc/math/math1.js

/**
 *
 * @param {BigInt} N 구해야할 N번째 피보나치 수
 */
const solution = (N) => {
  if (N === 0n) return 0;
  // 피사노 주기: 피보나치 수열을 임의의 자연수 M으로 나눈 나머지 수열이 반드시 갖는 주기
  // e.g. M = 3
  // 0 1 1 2 3 5 8 13 21 34 55 89 144...
  // 0 1 1 2 0 2 2 1 0 1 1 2 0 2 2 1... (0 1 1 2 0 2 2 1)이 반복됨
  // => 피사노 주기 = 8
  // M = 10^k (k >= 3) 일 때 피사노 주기 공식은 15 * 10^k-1
  // 따라서 피사노 주기는 15 * 10^6-1 = 1,500,000
  const PISANO = 1_500_000;
  const MOD = 1_000_000;
  const R = Number(N % BigInt(PISANO)); // N을 피사노 주기로 나눈 나머지

  const fibo = new Array(R + 1); // 피보나치 수열
  // 초기화
  fibo[0] = 0;
  fibo[1] = 1;

  for (let i = 2; i <= R; i++) {
    // (A + B) % M = ((A % M) + (B % M)) % M 과 동일함
    // 따라서 이전 두 수의 나머지들을 더하고 M으로 나눈 나머지를 저장
    fibo[i] = (fibo[i - 2] + fibo[i - 1]) % MOD;
  }

  return fibo[R];
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = BigInt(input[0]);
console.log(solution(N));
