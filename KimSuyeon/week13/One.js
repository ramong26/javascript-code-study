// https://www.acmicpc.net/problem/5557
// 5557번 - 1학년 - 실버 5
const input = require("fs")
  .readFileSync("./KimSuyeon/week13/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const nums = input[1].split(" ").map(Number);

const dp = Array.from({ length: N - 1 }, () => Array(21).fill(0n));

dp[0][nums[0]] = 1n;

for (let i = 1; i < N - 1; i++) {
  for (let sum = 0; sum <= 20; sum++) {
    if (dp[i - 1][sum] === 0n) continue;

    const cur = BigInt(nums[i]);

    if (sum + nums[i] <= 20) dp[i][sum + nums[i]] += dp[i - 1][sum];

    if (sum - nums[i] >= 0) dp[i][sum - nums[i]] += dp[i - 1][sum];
  }
}

console.log(dp[N - 2][nums[N - 1]].toString());

// input example
// 11
// 8 3 2 4 8 7 2 4 0 8 8
