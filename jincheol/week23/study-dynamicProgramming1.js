// 문제 링크: [크리보드](https://www.acmicpc.net/problem/11058)

// 실행: node jincheol/week23/study-dynamicProgramming1.js

/**
 *
 * @param {number} N 크리보드를 누르는 횟수
 */
const solution = (N) => {
  if (N <= 6) return N; // 6까지는 A를 출력하는 것이 제일 좋음

  const dp = new Array(N + 1).fill(0); // dp[i] = i번 눌렀을 때 A의 최대 개수

  for (let i = 1; i <= N; i++) {
    dp[i] = dp[i - 1] + 1; // A를 출력했을 때 개수 = 이전 A 개수 + 1;

    // 전체 선택 - 복사 - 붙여넣기를 사용하는 경우
    // k는 k번 째 누를 때부터 붙여넣기를 할 때를 뜻함 (최소 3번의 버튼을 눌러야 하기에 3부터 시작)
    for (let k = 3; k <= i; k++) {
      // e.g) N이 9이고 i = 8일 때 dp = [0, 1, 2, 3, 4, 5, 6, 9, 0, 0]인 상태
      // 15째 줄에서 dp[i - 1] + 1 = 9 + 1 = 10으로 dp[8] = 10 할당
      // dp = [0, 1, 2, 3, 4, 5, 6, 9, 10, 0]인 상태
      // k가 3 => dp[5] * 2 = 5 * 2 = 10 -> dp[8] 갱신 X
      // k가 4 => dp[4] * 3 = 4 * 3 = 12 -> dp[8] 갱신 O
      // k가 5 => dp[3] * 4 = 3 * 4 = 12 -> dp[8] 갱신 X
      // k가 6 => dp[2] * 5 = 2 * 5 = 10 -> dp[8] 갱신 X
      // k가 7 => dp[1] * 6 = 1 * 6 = 6 -> dp[8] 갱신 X
      // k가 8 => dp[0] * 7 = 0 * 7 = 0 -> dp[8] 갱신 X
      const newVal = dp[i - k] * (k - 1); // 선택, 복사, (k - 2) * 붙여넣기 사용했을 때 (k - 2인 이유는 전체 선택, 복사를 누르는 횟수)
      if (newVal > dp[i]) dp[i] = newVal; // 개수 비교 후 갱신
    }
  }

  return dp.at(-1);
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
console.log(solution(N));
