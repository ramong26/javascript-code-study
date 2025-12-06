// https://www.acmicpc.net/problem/11051
// 11051 - 이항 계수 2 - 실버 2

const input = require("fs")
  .readFileSync("./KimSuyeon/week17/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const [N, K] = input[0].split(" ").map(Number);
  const MOD = 10007;

  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

  for (let n = 0; n <= N; n++) {
    dp[n][0] = 1;
    for (let k = 1; k <= Math.min(n, K); k++) {
      if (k === n) {
        dp[n][k] = 1;
      } else {
        dp[n][k] = (dp[n - 1][k - 1] + dp[n - 1][k]) % MOD;
      }
    }
  }

  return dp[N][K];
}

console.log(solution(input));

// 틀림...
// let Aarr = [];
// let Barr = [];
// function calculateFactorial(a, b) {
//   for (let i = a; i >= a - b + 1; i--) {
//     Aarr.push(i);
//     Barr.push(i - a + b);
//   }
//   // console.log(` Aarr: ${Aarr}`, ` Barr: ${Barr}`);
//   return { Aarr, Barr };
// }
// function solution(input) {
//   const [n, k] = input[0].split(" ").map(Number);
//   let answer = 1;
//   let mod = 10007;

//   calculateFactorial(n, k);

//   for (let i = 0; i < k; i++) {
//     answer = (answer * Aarr[i]) / Barr[i];
//   }

//   return answer % mod;
// }
// console.log(solution(input));
//input 예시
//5 2
