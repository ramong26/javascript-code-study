// https://www.acmicpc.net/problem/11058
// 11058 - 크리보드 - 골드 5

const input = require("fs")
  .readFileSync("./KimSuyeon/week13/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 문제요약 N의 갯수가 주어지고
// 컨트롤 A, 컨트롤 C, 컨트롤 V를 눌러 A의 최대갯수를 출력해라
// 접근: N의 갯수에 따라 달라짐
// 6개 이하면 N의 갯수만큼 A를 출력
// 7개 이상이면 그때부터 DP

function maxAs(N) {
  // 6이하면 N값 그대로 출력
  if (N <= 6) {
    return N;
    // 아닐 경우
  } else {
    // A의 최대 갯수 저장하는 용도
    const dp = Array(N + 1).fill(0);

    for (let i = 1; i <= N; i++) {
      // A만 출력했을 때
      dp[i] = i;
      // i가 3이상일 때부터 컨트롤 A, 컨트롤 C, 컨트롤 V를 눌렀을 때의 최대값 계산
      for (let j = 3; j <= i; j++) {
        // 현재 dp[i]값과 dp[i - j] * (j - 1)를 비교 / i-j는 복붙 하기 전 / j-1는 붙여넣기 횟수
        dp[i] = Math.max(dp[i], dp[i - j] * (j - 1));
      }
    }
    return dp[N];
  }
}

console.log(maxAs(parseInt(input[0])));
// input 예시
// 11
