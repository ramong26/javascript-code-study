/*
DP - 1학년(https://www.acmicpc.net/problem/5557)
상근이가 1학년 때, 덧셈, 뺄셈을 매우 좋아했다. 상근이는 숫자가 줄 지어있는 것을 보기만 하면, 마지막 두 숫자 사이에 '='을 넣고, 나머지 숫자 사이에는 '+' 또는 '-'를 넣어 등식을 만들며 놀고 있다. 예를 들어, "8 3 2 4 8 7 2 4 0 8 8"에서 등식 "8+3-2-4+8-7-2-4-0+8=8"을 만들 수 있다.

상근이는 올바른 등식을 만들려고 한다. 상근이는 아직 학교에서 음수를 배우지 않았고, 20을 넘는 수는 모른다. 따라서, 왼쪽부터 계산할 때, 중간에 나오는 수가 모두 0 이상 20 이하이어야 한다. 예를 들어, "8+3+2-4-8-7+2+4+0+8=8"은 올바른 등식이지만, 8+3+2-4-8-7이 음수이기 때문에, 상근이가 만들 수 없는 등식이다.

숫자가 주어졌을 때, 상근이가 만들 수 있는 올바른 등식의 수를 구하는 프로그램을 작성하시오.
*/


function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);
  const numbers = lines[1].split(' ').map(Number);

  const dp = Array.from({length: n}, () => Array(21).fill(0n));  // dp[i][j] = i번째 숫자까지 사용, 현재값이 j인 경우의 수

  const resultNum = numbers[n-1];  // 마지막 숫자

  dp[0][numbers[0]] = 1n;

  for (let i = 1; i < n - 1; i++) {
    for (let prev = 0; prev <= 20; prev++) {
      if (dp[i-1][prev] > 0n) {
        // 덧셈
        let next = prev + numbers[i];  // 덧셈 연산
        if (next >= 0 && next <= 20) {
          dp[i][next] += dp[i-1][prev];
        }

        // 뺄셈
        next = prev - numbers[i];
        if (next >= 0 && next <= 20) {
          dp[i][next] += dp[i-1][prev];
        }
      }
    }
  }

  return dp[n-2][resultNum].toString();  // n-2번째까지 계산한 결과가 resultNum과 같은 경우의 수 반환
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));