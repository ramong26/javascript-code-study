// 문제 링크: [등굣길](https://school.programmers.co.kr/learn/courses/30/lessons/42898)

// 계속되는 폭우로 일부 지역이 물에 잠겼습니다. 물에 잠기지 않은 지역을 통해 학교를 가려고 합니다.
// 집에서 학교까지 가는 길은 m x n 크기의 격자모양으로 나타낼 수 있습니다.
// 가장 왼쪽 위, 즉 집이 있는 곳의 좌표는 (1, 1)로 나타내고 가장 오른쪽 아래, 즉 학교가 있는 곳의 좌표는 (m, n)으로 나타냅니다.
// 격자의 크기 m, n과 물이 잠긴 지역의 좌표를 담은 2차원 배열 puddles이 매개변수로 주어집니다.
// 오른쪽과 아래쪽으로만 움직여 집에서 학교까지 갈 수 있는 최단경로의 개수를 1,000,000,007로 나눈 나머지를 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 격자의 크기 m, n은 1 이상 100 이하인 자연수입니다.
// m과 n이 모두 1인 경우는 입력으로 주어지지 않습니다.
// 물에 잠긴 지역은 0개 이상 10개 이하입니다.
// 집과 학교가 물에 잠긴 경우는 입력으로 주어지지 않습니다.

// 실행: node jincheol/week5/study-dynamicProgramming2.js

// 각 칸까지 도달하는 방법의 개수를 저장해 나감
function solution(m, n, puddles) {
  let answer = 0;

  const raw = 1_000_000_007; // 다른 소수는 998,244,353도 많이 사용된다고 함, 이유는 png 참고
  // 처음 ways를 아래 방식으로 풀었을 때 통과는 했지만 이후 변수명을 바꾸는 과정에서 효율성에서 통과가 되지 않는 상황 발생
  // ai 도움을 받다가 얕은 복사 문제가 생기는 것을 확인 -> 왜 통과됐었는지 모름..
  // const ways = new Array(n + 1).fill(new Array(m + 1).fill(0));
  const ways = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0)); // 1base index를 위해 n + 1, m + 1
  const traps = new Set(); // 물 웅덩이를 저장할 Set 생성
  puddles.forEach(([x, y]) => traps.add(`${x},${y}`)); // traps에 물 웅덩이 저장

  ways[1][1] = 1; // 시작 지점에 도착하는 방법은 1가지라 1

  for (let y = 1; y <= n; y++) {
    for (let x = 1; x <= m; x++) {
      // 현재 도착한 칸이 물 웅덩이인지 확인
      const isTrap = traps.has(`${x},${y}`);
      if (isTrap) continue; // 물 웅덩이면 건너뜀

      const isHome = x === 1 && y === 1; // 시작 지점인지 확인
      if (isHome) continue; // 시작 지점이면 건너뜀

      const topToDownWayCount = ways.at(y - 1).at(x); // 위에서 현재 칸으로로 내려오는 방법의 개수
      const leftToRightWayCount = ways.at(y).at(x - 1); // 왼쪽에서 현재 칸으로 오는 방법의 개수
      ways[y][x] = (topToDownWayCount + leftToRightWayCount) % raw; // 현재 칸에 올 수 있는 방법의 개수들을 더함
    }
  }

  answer = ways.at(-1).at(-1); // 학교에 도착하는 방법의 개수

  return answer;
}

// 간헐적으로 효율성에서 떨어지는 문제를 해결하기 위한 다른 방법
// 1째 방법의 forEach문을 for문으로 변경해도 효율성 테스트 1에서 4.31ms, 이 방법은 효율성 테스트 1에서 1.22ms
function solution2(m, n, puddles) {
  const MOD = 1_000_000_007;
  const ways = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  // forEach문에 for문보다 느리기 때문에 for문으로 변경
  // Set을 생성하지 않고 ways에 직접 물 웅덩이를 표시
  for (let [x, y] of puddles) ways[y][x] = -1;

  ways[1][1] = 1;

  for (let y = 1; y <= n; y++) {
    for (let x = 1; x <= m; x++) {
      const isTrap = ways[y][x] === -1; // 현재 도착한 칸이 물 웅덩이인지 확인
      if (isTrap) continue;
      const isHome = x === 1 && y === 1; // 시작 지점인지 확인
      if (isHome) continue;

      const topToDownWayCount = ways[y - 1][x] !== -1 ? ways[y - 1][x] : 0; // 위의 칸이 물 웅덩이면 0, 아니면 위의 칸까지 도달하는 방법 개수
      const leftToRightWayCount = ways[y][x - 1] !== -1 ? ways[y][x - 1] : 0; // 왼쪽 칸이 물 웅덩이면 0, 아니면 왼쪽 칸까지 도달하는 방법의 개수
      ways[y][x] = (topToDownWayCount + leftToRightWayCount) % MOD; // 현재 칸에 도달하는 방법들의 합
    }
  }

  return ways.at(-1).at(-1); // answer 변수 생성 및 재할당도 삭제, 바로 return
}

const ex_m = 4;
const ex_n = 3;
const ex_puddles = [[2, 2]];

const ex_sol = solution(ex_m, ex_n, ex_puddles);
const ex_sol2 = solution2(ex_m, ex_n, ex_puddles);
// 입출력 예시 결과값: 4
console.log(ex_sol, ex_sol2);
