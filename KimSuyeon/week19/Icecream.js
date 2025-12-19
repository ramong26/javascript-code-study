// https://www.acmicpc.net/problem/2422
// 한윤정이 이탈리아에 가서 아이스크림을 사먹는데 - 실버 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week19/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 못 먹는 조합을 2차원 배열에 저장
// 1~N 아이스크림 중에서 3개를 고르는 모든 조합을 돌면서
// 못 먹는 조합에 해당하는지 확인
function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);

  const bad = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  //   console.log(bad);

  // 못 먹는 조합 저장
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    bad[a][b] = true;
    bad[b][a] = true;
  }
  //   console.log(bad);
  let answer = 0;

  // 3개 고르는 모든 조합 확인 -> 각 아이스크림 번호: i, j, k
  // 못 먹는 조합이 하나라도 있으면 continue
  for (let i = 1; i <= N - 2; i++) {
    for (let j = i + 1; j <= N - 1; j++) {
      if (bad[i][j]) continue; // i,j 조합이 못 먹는 조합이면 넘어감
      for (let k = j + 1; k <= N; k++) {
        if (bad[i][k] || bad[j][k]) continue; // i,k 또는 j,k 조합이 못 먹는 조합이면 넘어감
        answer++;
      }
    }
  }

  return answer;
}
console.log(solution(input));

// input 예시
// 5 3
// 1 2
// 3 4
// 1 3
