// 11728번: 배열 합치기
// https://www.acmicpc.net/problem/11728

const input = require("fs")
  .readFileSync("./KimSuyeon/week6/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const arr2 = input[1].split(" ").map(Number);
const arr3 = input[2].split(" ").map(Number);

const finishArr = arr2.concat(arr3); // 그냥 합치기
console.log(finishArr.sort((a, b) => a - b).join(" "));

// input 예시
// 2 2
// 3 5
// 2 9
