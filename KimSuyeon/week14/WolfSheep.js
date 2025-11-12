// https://www.acmicpc.net/problem/16956
// 16956 - 늑대와 양 - 실버 3

// https://www.acmicpc.net/problem/2251
// 2251 - 물통 - 골드 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week14/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 접근 : 늑대 주변 8방향에 양이 있는지 확인하고, 양이 있으면 바로 "0" 출력
// 양이 없으면 늑대 주변 8방향에 울타리를 설치하고 결과 출력
// 이때 늑대만 움직일 수 있다. 양은 움직이지 못함

function solution(input) {
  const [R, C] = input[0].split(" ").map(Number);
  const graph = [];

  for (let i = 1; i <= R; i++) {
    graph.push(input[i].split(""));
  }

  // 상, 하, 좌, 우 (4방향) (두칸 인접하면 안돼서 대각선 제외,,)
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let safe = true; // 안전 여부 확인

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (graph[i][j] === "W") {
        for (let [dx, dy] of dir) {
          const nx = i + dx;
          const ny = j + dy;

          // 범위 체크
          if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;

          // 늑대 주변에 양이 있는지 확인 있다면 0을 출력
          if (graph[nx][ny] === "S") {
            console.log(0);
            return;
          }

          if (graph[nx][ny] === ".") {
            graph[nx][ny] = "D"; // 빈 칸이면 울타리 설치
          }
          //   console.log(graph);
        }
      }
    }
  }

  console.log(1);
  graph.forEach((row) => console.log(row.join("")));
}

solution(input);
// input 예시
// 6 6
// ..S...
// ..S.W.
// .S....
// ..W...
// ...W..
// ......
