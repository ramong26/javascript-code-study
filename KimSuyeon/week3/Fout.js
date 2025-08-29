// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input1.txt", "utf-8")
  .trim()
  .split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 7
const M = Number(input[0].split(" ")[1]); // 392

//BFS를 돌릴 필요도 없고, 큐도 필요 없음
if (N === M) {
  console.log("0"); // 이미 같으면 0
  process.exit();
}

const operators = ["*", "+", "-", "/"];
const visited = new Set();
const queue = [];
let head = 0; // 현재 큐에서 읽어야 할 위치

queue.push([N, ""]);
visited.add(N);
while (head < queue.length) {
  const [current, path] = queue[head++];

  for (const op of operators) {
    let next;
    switch (op) {
      case "+":
        next = current + current;
        break;
      case "-":
        next = current - current;
        break;
      case "*":
        next = current * current;
        break;
      case "/":
        if (current === 0) continue;
        next = 1;
        break;
    }
    if (next < 0 || next > 1_000_000_000) continue;
    if (visited.has(next)) continue;

    if (next === M) {
      console.log(path + op);
      process.exit();
    }

    visited.add(next);
    queue.push([next, path + op]);
  }
}

console.log("-1");
