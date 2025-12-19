// 문제 링크: [뮤탈리스크](https://www.acmicpc.net/problem/12869)

// 실행: node jincheol/week29/personal-dynamicProgramming3.js

/**
 *
 * @param {number} N SCV의 수
 * @param {number[]} SCVs SCV들의 체력
 */
const solution = (N, SCVs) => {
  while (SCVs.length < 3) SCVs.push(0); // scv의 개수가 3개 미만이면 0을 추가하여 런타임 오류 방지

  const damages = [
    [9, 3, 1],
    [9, 1, 3],
    [3, 9, 1],
    [3, 1, 9],
    [1, 9, 3],
    [1, 3, 9],
  ];

  // 최적화를 위한 정렬, SCV의 순서가 의미가 없음을 이용
  // 3마리의 동일한 scv의 체력으로 저장하는 dp의 테이블은 6가지임 => 비효율
  // e.g. [10, 5, 1], [10, 1, 5], [5, 10, 1], [5, 1, 10], [1, 5, 10],[1, 10, 5]
  // 이런 같은 케이스를 여러 dp 테이블에 저장하는 것을 방지하기 위해 동일하게 내림차순 정렬하여 통일함
  SCVs.sort((a, b) => b - a);

  // dp 테이블, 최대 체력이 60이라 61로 3차원(3마리)
  const dp = Array(61)
    .fill(0)
    .map(() =>
      Array(61)
        .fill(0)
        .map(() => Array(61).fill(0))
    );

  // bfs를 위한 초기화
  let answer = 0;
  const [hp1, hp2, hp3] = SCVs;
  const queue = [[hp1, hp2, hp3]]; // bfs 큐
  dp[hp1][hp2][hp3] = 1; // 1번 공격 필요 -> 나중에 큐에서 뺄 때 카운트

  let head = 0;
  while (head < queue.length) {
    const curHP = queue[head++]; // 큐에서 추출 및 head 증가
    const [curHP1, curHP2, curHP3] = curHP;
    const curCount = dp[curHP1][curHP2][curHP3]; // 현재 공격한 횟수

    // 종료 조건, 위에서 1로 설정했으므로 현재 카운트에서 -1
    if (curHP1 === 0 && curHP2 === 0 && curHP3 === 0) {
      answer = curCount - 1;
      break;
    }

    // 6가지 공격 모두 탐색
    for (const [dam1, dam2, dam3] of damages) {
      // SCV 체력 계산, 체력이 0 미만도 0으로 설정
      let nextHP1 = Math.max(0, curHP1 - dam1);
      let nextHP2 = Math.max(0, curHP2 - dam2);
      let nextHP3 = Math.max(0, curHP3 - dam3);

      // 최적화를 위한 내림차순 정렬
      const nextHP = [nextHP1, nextHP2, nextHP3];
      nextHP.sort((a, b) => b - a);

      // 방문하지 않은 경우 카운트 중가 및 큐에 추가
      // dp 테이블은 정렬된 값 기준
      if (dp[nextHP[0]][nextHP[1]][nextHP[2]] === 0) {
        dp[nextHP[0]][nextHP[1]][nextHP[2]] = curCount + 1;
        queue.push(nextHP);
      }
    }
  }

  return answer;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const SCVs = input[1].split(' ').map(Number);
console.log(solution(N, SCVs));
