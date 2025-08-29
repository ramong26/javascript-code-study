const fs = require("fs");

const input = fs
  .readFileSync("./KimSuyeon/week3/input4.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const N = Number(input[0]); // 컴퓨터 수
const M = Number(input[1]); // 연결되어 있는 컴퓨터 쌍의 수 -> 필요없음

// 그래프 그리기
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 2; i < input.length; i++) {
  const [a, b] = input[i].split(" ").map(Number); // 구조분해할당으로 a,b에 할당
  graph[a].push(b); // 1 → 2 가능
  graph[b].push(a); // 2 → 1 가능
}

const visited = Array(N + 1).fill(false); // 방문처리 false로 초기화
let visitedCount = 0; // 감염된 컴퓨터 수

function bfs(start) {
  const queue = []; // 큐 생성
  queue.push(start); // 시작점 큐에 넣기
  visited[start] = true; // 방문처리
  visitedCount++; // 시작점도 감염된 컴퓨터 수에 포함

  // BFS 탐색
  while (queue.length > 0) {
    const current = queue.shift(); // 큐에서 하나 꺼내기
    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        visitedCount++;
        queue.push(neighbor);
      }
    }
  }
}
bfs(1);
console.log(visitedCount - 1);
