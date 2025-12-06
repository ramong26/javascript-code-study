// https://www.acmicpc.net/problem/2748
// 2748 - 피보나치 수 2 - 브론즈 1

const input = require("fs")
  .readFileSync("./KimSuyeon/week16/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const N = BigInt(input[0]);

  const dp = [0n, 1n];
  for (let i = 2n; i <= N; i++) {
    dp[i] = dp[i - 1n] + dp[i - 2n];
  }

  return dp[N].toString();
}

console.log(solution(input));
// input 예시
// 10
