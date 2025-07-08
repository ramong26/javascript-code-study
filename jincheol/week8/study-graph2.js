// 문제 링크: [순위](https://school.programmers.co.kr/learn/courses/30/lessons/49191)

// n명의 권투선수가 권투 대회에 참여했고 각각 1번부터 n번까지 번호를 받았습니다.
// 권투 경기는 1대1 방식으로 진행이 되고, 만약 A 선수가 B 선수보다 실력이 좋다면 A 선수는 B 선수를 항상 이깁니다.
// 심판은 주어진 경기 결과를 가지고 선수들의 순위를 매기려 합니다.
// 하지만 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없습니다.
// 선수의 수 n, 경기 결과를 담은 2차원 배열 results가 매개변수로 주어질 때
// 정확하게 순위를 매길 수 있는 선수의 수를 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 선수의 수는 1명 이상 100명 이하입니다.
// 경기 결과는 1개 이상 4,500개 이하입니다.
// results 배열 각 행 [A, B]는 A 선수가 B 선수를 이겼다는 의미입니다.
// 모든 경기 결과에는 모순이 없습니다.

// 실행: node jincheol/week8/study-graph2.js

// 플로이드 워셜 알고리즘 사용
// 모든 노드 간의 관계를 미리 계산 (모든 경기의 결과)
function solution(n, results) {
  // 모든 경기의 결과를 저장할 그래프
  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));

  // 직접적인 승패 기록 저장
  for (const [winner, loser] of results) graph[winner][loser] = true;

  // 플로이드 워셜 알고리즘
  // e.g. A가 B한테 이기고, B가 C한테 이겼으면 A는 C를 이김
  // B -> mid, A -> winner, C -> loser;
  for (let mid = 1; mid <= n; mid++) {
    for (let winner = 1; winner <= n; winner++) {
      for (let loser = 1; loser <= n; loser++) {
        // 만약 A가 B를 이기고, B가 C를 이겼으면 (A가 C를 이긴다는 것을 확인)
        const inferResult = graph[winner][mid] && graph[mid][loser];
        if (inferResult) graph[winner][loser] = true; // A와 C의 관계를 저장
      }
    }
  }

  let answer = 0;

  // 각 선수의 순위 결정 가능 여부 확인
  // 각 선수에 대한 다른 선수와 매치 결과를 확인하기 위해 2중 for 루프
  for (let player = 1; player <= n; player++) {
    let knowMatchResult = 0; // player와 승패 관계가 명확한 선수의 수
    for (let other = 1; other <= n; other++) {
      if (player === other) continue; // 한 선수에 대한 다른 선수가 본인일 경우 continue

      // 두 선수의 승패 관계가 명확한 경우
      const playerWin = graph[player][other]; // player가 이겼거나
      const otherWin = graph[other][player]; // other가 이겼거나
      if (playerWin || otherWin) knowMatchResult++; // 카운팅
    }

    // player가 본인을 제외한 선수와의 관계가 모두 명확하면 answer++
    if (knowMatchResult === n - 1) answer++;
  }

  return answer;
}

const ex_n = 5;
const ex_results = [
  [4, 3],
  [4, 2],
  [3, 2],
  [1, 2],
  [2, 5],
];

const ex_sol = solution(ex_n, ex_results);
// 입출력 예시 결과값: 2
console.log(ex_sol);
