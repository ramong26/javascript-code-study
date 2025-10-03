// https://www.acmicpc.net/problem/11650
// 11650번: 좌표 정렬하기 - 실버5

const input = require("fs")
  .readFileSync("./KimSuyeon/week8/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const coords = input.slice(1).map((line) => line.split(" ").map(Number));
// console.log(coords); // [ [ 3, 4 ], [ 1, 1 ], [ 1, -1 ], [ 2, 2 ], [ 3, 3 ] ]
console.log(
  coords
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
    .map((v) => v.join(" "))
    .join("\n")
);
// input example
// 5
// 3 4
// 1 1
// 1 -1
// 2 2
// 3 3
