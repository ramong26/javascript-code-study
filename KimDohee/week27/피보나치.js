/*
수학1 - 피보나치(https://www.acmicpc.net/problem/2747)
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.
이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.
n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.
*/

function solution(input) {
  const n = parseInt(input);
  const dp = new Array(n + 1);

  // 초기값 설정
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];  // 점화식
  }

  return dp[n];
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));