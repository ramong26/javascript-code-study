/*
이항계수2 (https://www.acmicpc.net/problem/11051)
- 자연수N과 정수K가 주어졌을 때 이항 계수(N K)를 10,007로 나눈 나머지를 구하기 
*/

function solution(input) {
  const [n, k] = input.split(' ').map(Number);

  // dp[i][j] = C(i, j) = i개중 j개를 선택하는 경우의 수
  const dp = Array.from({ length: n+1 }, () => Array(k+1).fill(0));

  // 기저조건: C(i, 0) = 1일 때
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }

  // 파스칼의 삼각형 점화식으로 DP 테이블 채우기
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % 10007;  // 점화식
    }
  }

  return dp[n][k];
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));