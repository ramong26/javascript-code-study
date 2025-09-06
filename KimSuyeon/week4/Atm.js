// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input1.txt", "utf-8")
  .trim()
  .split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const N = input[0].split(" ").map(Number); // [5]
const M = input[1].split(" ").map(Number); // [ 3, 1, 4, 3, 2 ]
M.sort((a, b) => a - b); // [1, 2, 3, 3, 4]

let sum = 0;
let orderArray = [];

for (let i = 0; i < M.length; i++) {
  sum = sum + M[i];
  orderArray.push(sum);
}

console.log(orderArray.reduce((acc, cur) => acc + cur, 0)); // 모든 값을 합ㅈ산해서 결과 출력
