// 문제 링크: [초콜릿 자르기](https://www.acmicpc.net/problem/2163)

// 실행: node jincheol/week29/personal-dynamicProgramming1.js

/**
 * 전체 조각 수 -1이 최소 쪼개기 횟수
 * @param {number} N
 * @param {number} M
 */
const solution = (N, M) => {
  return N * M - 1;
};

/**
 * dp를 사용한 풀이
 * @param {number} N
 * @param {number} M
 */
const solution2 = (N, M) => {
  // DP 테이블 초기화 (최대 N x M 크기를 고려, N과 M 중 큰 값을 max_dim으로)
  const max_dim = Math.max(N, M);
  // D[i][j] = i x j 초콜릿을 쪼개는 최소 횟수
  const dp = Array.from({ length: max_dim + 1 }, () =>
    Array(max_dim + 1).fill(Infinity)
  );

  // 기저 조건 초기화
  for (let i = 1; i <= max_dim; i++) {
    dp[i][1] = i - 1; // i x 1 초콜릿
    dp[1][i] = i - 1; // 1 x i 초콜릿
  }
  dp[1][1] = 0; // 1 x 1 초콜릿

  // dp[i][j]는 dp[j][i]와 같으므로, 대칭을 이용해 계산 횟수를 줄일 수 있다
  for (let i = 2; i <= max_dim; i++) {
    for (let j = 2; j <= max_dim; j++) {
      // 이미 계산했으면 건너뜁니다. (대칭 dp[j][i] = dp[i][j])
      if (dp[i][j] !== Infinity) continue;

      let min_cuts = Infinity;

      // 1. 가로로 쪼개기 (i를 k와 i-k로)
      for (let k = 1; k < i; k++) {
        // 1 (한 번 쪼갠 비용) + dp[k][j] + dp[i-k][j]
        min_cuts = Math.min(min_cuts, 1 + dp[k][j] + dp[i - k][j]);
      }

      // 2. 세로로 쪼개기 (j를 k와 j-k로)
      for (let k = 1; k < j; k++) {
        // 1 (한 번 쪼갠 비용) + dp[i][k] + dp[i][j-k]
        min_cuts = Math.min(min_cuts, 1 + dp[i][k] + dp[i][j - k]);
      }

      dp[i][j] = min_cuts;
      // 대칭되는 값도 함께 저장 (최적화)
      dp[j][i] = min_cuts;
    }
  }

  // 최종 결과 반환. N, M이 max_dim보다 작을 수도 있으므로, 해당 위치의 값을 반환
  // N, M이 최대 1000이므로 이 배열 크기는 너무 커서 실제로는 메모리/시간 초과가 발생
  if (N <= max_dim && M <= max_dim) {
    return dp[N][M];
  }
  // N, M이 max_dim을 초과하는 경우는 없어야 하지만, 만약을 위해...
  return N * M - 1;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
console.log(solution2(N, M));
