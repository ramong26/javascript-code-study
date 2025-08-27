// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input3.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim());
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;

// 8방향: 상, 하, 좌, 우 + 대각선
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

// DFS로 섬 탐색
function dfs(map, x, y, w, h) {
  map[y][x] = 0; // 방문 처리
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    //  지도 범위 내 + 땅이면 재귀 호출
    if (nx >= 0 && nx < w && ny >= 0 && ny < h && map[ny][nx] === 1) {
      dfs(map, nx, ny, w, h);
    }
  }
}

//
while (idx < input.length) {
  const [w, h] = input[idx].split(" ").map(Number);
  if (w === 0 && h === 0) break; // 종료 조건
  idx++;

  // 지도 입력
  const map = [];
  for (let i = 0; i < h; i++, idx++) {
    map.push(input[idx].split(" ").map(Number));
  }

  let count = 0;

  // 지도 돌기
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // 방문하지 않은 땅일때
      if (map[y][x] === 1) {
        dfs(map, x, y, w, h); // DFS로 섬 탐색
        count++; // 섬 개수 증가
      }
    }
  }

  console.log(count);
}
