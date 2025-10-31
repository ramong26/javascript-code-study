// https://www.acmicpc.net/problem/15989
// 15989번: 1, 2, 3 더하기 4
const input = require("fs")
  .readFileSync("./KimSuyeon/week12/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 문제요약
// 정수 N이 주어졌을 때, 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 문제
// 단, 합을 이루고 있는 수의 순서만 다른 것은 같은 것으로 친다.

const N = Number(input[0]);
const cases = input.slice(1).map(Number);

// 양수 N (1 ≤ N ≤ 10,000)까지의 경우의 수를 미리 구해놓기 위한 dp 배열 초기화
const MAX = 10000;
const dp = Array(MAX + 1).fill(0);

dp[0] = 1; // 0을 만드는 방법은 1가지 (아무것도 더하지 않는 방법)

const nums = [1, 2, 3];

for (let num of nums) {
  for (let i = num; i <= MAX; i++) {
    dp[i] += dp[i - num];
  }
}

for (let n of cases) {
  console.log(dp[n]);
}

// input example
// 3
// 4
// 7
// 10
