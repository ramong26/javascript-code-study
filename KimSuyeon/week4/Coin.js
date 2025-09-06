// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input3.txt", "utf-8")
  .trim()
  .split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);
const M = input.slice(1).map(Number);

let j = N - 1; // 가장 큰 동전부터
let count = 0;

while (K > 0 && j >= 0) {
  if (K >= M[j]) {
    count += Math.floor(K / M[j]);
    K %= M[j];
  }
  j--;
}

console.log(count);
