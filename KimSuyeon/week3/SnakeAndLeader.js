// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input2.txt", "utf-8")
  .trim()
  .split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 3
const M = Number(input[0].split(" ")[1]); // 7

let ladderArray = [];
for (let i = 1; i <= N; i++) {
  ladderArray.push(input[i].split(" ").map(Number)); //[ [ 32, 62 ], [ 42, 68 ], [ 12, 98 ] ]
}

let snakerArray = [];
for (let i = N + 1; i <= N + M; i++) {
  snakerArray.push(input[i].split(" ").map(Number)); //[[ 95, 13 ],[ 97, 25 ],[ 93, 37 ],[ 79, 27 ],[ 75, 19 ],[ 49, 47 ],[ 67, 17 ]]
}

const board = Array(101).fill(0);

for (const [x, y] of ladderArray) {
  board[x] = y;
}
for (const [u, v] of snakerArray) {
  board[u] = v;
}

const dist = Array(101).fill(-1);
const queue = [];

dist[1] = 0;
queue.push(1);

// 계속 돌게
while (true) {
  //
  const current = queue.shift();
  if (current === 100) break;

  // 주사위 1~6
  for (let dice = 1; dice <= 6; dice++) {
    const next = current + dice;
    if (next > 100) continue;

    const final = board[next] || next; // 사다리나 뱀이 있으면 이동, 없으면 제자리
    if (dist[final] === -1) {
      // 아직 방문하지 않은 곳이라면
      dist[final] = dist[current] + 1; // 이동 횟수 증가
      queue.push(final); // 큐에 추가
    }
  }
}
console.log(dist[100]);
