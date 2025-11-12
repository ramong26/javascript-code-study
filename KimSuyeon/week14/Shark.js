// https://www.acmicpc.net/problem/17086
// 17086 - 아기 상어 2 - 실버 2

const input = require("fs")
  .readFileSync("./KimSuyeon/week14/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 접근 : 한칸씩 8방향으로 탐색하면서 상어와의 거리 구하기
const dir = [
  [-1, -1],
  [-1, 0],
  [1, -1],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [0, -1],
];

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number); // 5 4
  const graph = []; // 상어집 초기화
  for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number));
  }

  const queue = [];
  // 모든 상어 위치를 큐에 넣음
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 1) {
        queue.push([i, j, 0]);
      }
    }
  }

  let distance = 0;

  while (queue.length) {
    const [x, y, dist] = queue.shift(); // 상어집 위치와 거리 정보 꺼내기

    // 8방향 탐색
    for (let i = 0; i < 8; i++) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (graph[nx][ny] === 0) {
          graph[nx][ny] = dist + 1; // 상어가 없는 칸이라면 그 칸까지의 최소 거리
          queue.push([nx, ny, dist + 1]);
          distance = Math.max(distance, dist + 1);
        }
      }
    }
  }
  return distance;
}

console.log(solution(input));
// input 예시
// 5 4
// 0 0 1 0
// 0 0 0 0
// 1 0 0 0
// 0 0 0 0
// 0 0 0 1