// 문제 링크: [치킨 배달](https://www.acmicpc.net/problem/15686)

// 실행: node jincheol/week20/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week20/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 도시의 크기
 * @param {number} M 치킨집의 개수 범위 (M <= 개수 <= 13)
 * @param {number[][]} map 도시 구성
 */
const solution = (N, M, map) => {
  const houses = []; // 집들의 좌표
  const chickens = []; // 치킨집들의 좌표
  // 집과 치킨집들의 좌표 저장
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const place = map[row][col];
      if (place === 1) houses.push([row, col]);
      else if (place === 2) chickens.push([row, col]);
    }
  }

  const H = houses.length; // 집 개수
  const C = chickens.length; // 치킨집 개수

  // 모든 집의 치킨집들까지 거리를 저장
  const chickenRoads = Array.from({ length: H }, () => Array(C).fill(0));
  // 집 순회
  for (let h = 0; h < H; h++) {
    const [hRow, hCol] = houses[h]; // 집 좌표
    // 치킨집 순회
    for (let c = 0; c < C; c++) {
      const [cRow, cCol] = chickens[c]; // 치킨집 좌표
      // 현재 집과 치킨집까지 거리 저장
      chickenRoads[h][c] = Math.abs(hRow - cRow) + Math.abs(hCol - cCol);
    }
  }

  // 집에서 치킨집이 아닌 치킨집에서 집까지 거리를 기준으로
  // 치킨집 M개의 조합을 모두 확인하며 정답 찾기
  let answer = Infinity;
  const chickenQueue = []; // dfs를 위한 큐 (치킨집 M개 조합)

  /**
   *
   * @param {number} start 치킨집 인덱스의 시작 위치 (중복 선택 방지를 위함)
   * @param {number} depth // 현재까지 선택한 치킨집의 개수
   */
  const dfs = (start, depth) => {
    // 치킨집 M개를 모두 선택했을 때 계산
    if (depth === M) {
      let totalChickenRoad = 0; // 도시의 치킨 거리
      // 집 순회
      for (let h = 0; h < H; h++) {
        let minDist = Infinity; // 현재 집의 치킨 거리
        // 선택한 치킨집들 순회
        for (let i = 0; i < chickenQueue.length; i++) {
          const chickenIdx = chickenQueue[i]; // 선택한 치킨집의 인덱스
          // 현재 집과 현재 치킨집의 거리가 이전 치킨 거리보다 작으면
          if (chickenRoads[h][chickenIdx] < minDist) {
            minDist = chickenRoads[h][chickenIdx]; // 치킨 거리 값 갱신
          }
        }

        totalChickenRoad += minDist; // 도시의 치킨 거리에 현재 집 치킨 거리 더하기
        // 현재까지 도시의 치킨 거리가 이전 조합보다 같거나 크면 조기 종료
        if (totalChickenRoad >= answer) return;
      }
      // 현재 조합의 최종 도시의 치킨 거리가 이전 값보다 작으면 갱신
      if (totalChickenRoad < answer) answer = totalChickenRoad;
      return; // 종료
    }

    // 아직 치킨집 M개를 선택하지 않았으면 치킨집 추가 선택
    for (let i = start; i < C; i++) {
      chickenQueue.push(i); // 큐에 추가
      dfs(i + 1, depth + 1); // 탐색
      chickenQueue.pop(); // 백트래킹
    }
  };

  // 치킨집의 개수가 M과 같거나 작으면 모든 치킨집 선택 (예외 처리)
  if (C <= M) {
    let sum = 0; // 도시의 치킨 거리
    // 모든 집 순회
    for (let h = 0; h < H; h++) {
      let minDist = Infinity; // 현재 집의 치킨 거리
      // 모든 치킨집 순회
      for (let c = 0; c < C; c++) {
        // 현재 집의 치킨 거리 갱신
        if (chickenRoads[h][c] < minDist) minDist = chickenRoads[h][c];
      }
      sum += minDist; // 도시의 치킨 거리 값에 현재 집의 치킨 거리 더하기
    }
    return sum; // 최종 도시의 치킨 거리 반환
  }

  // 치킨 집의 개수가 M보다 클 경우
  dfs(0, 0); // 탐색 시작

  return answer; // 정답 반환
};

const [N, M] = input.shift().split(' ').map(Number);
const map = input.map((v) => v.split(' ').map(Number));
console.log(solution(N, M, map));
