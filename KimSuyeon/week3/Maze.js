const fs = require("fs");

const input = fs
  .readFileSync("./KimSuyeon/week3/input5.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const [N, M] = input[0].split(" ").map(Number); // N: 행, M: 열

//미로 배열 만들기
const mazeArray = [];
for (let i = 1; i < 1 + N; i++) {
  if (input[i]) {
    const row = input[i].split("").map(Number);
    mazeArray.push(row);
  }
}

const directions = [
  [0, 1], // 오른쪽
  [1, 0], // 아래
  [0, -1], // 왼쪽
  [-1, 0], // 위
];

// bfs 탐색
function bfs(maze, start, end) {
  const visited = Array.from({ length: N }, () => Array(M).fill(false)); // 방문 여부 배열
  const dist = Array.from({ length: N }, () => Array(M).fill(0)); // 거리 배열

  const queue = [];
  queue.push(start);
  visited[start[0]][start[1]] = true;
  dist[start[0]][start[1]] = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift(); // 큐에서 하나 꺼내기

    // 도착 지점에 도달하면 거리 반환
    if (x === end[0] && y === end[1]) {
      return dist[x][y];
    }

    // 네 방향으로 이동
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // 범위 확인 (미로를 벗어나지 않는지 체크)
      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        // 이동할 수 있는 칸(1) && 아직 방문하지 않은 칸
        if (maze[nx][ny] === 1 && !visited[nx][ny]) {
          visited[nx][ny] = true;
          dist[nx][ny] = dist[x][y] + 1; // 이전 칸 + 1
          queue.push([nx, ny]);
        }
      }
    }
  }
  return -1;
}

const result = bfs(mazeArray, [0, 0], [N - 1, M - 1]);
console.log(result);
