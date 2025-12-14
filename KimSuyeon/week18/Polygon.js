// https://www.acmicpc.net/problem/2166
// 다각형의 면적 골드 5

const input = require("fs")
  .readFileSync("./KimSuyeon/week18/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 다각형 모양이 이상할 경우 어떻게 처리하지?
// -> 신발끈 공식 이용;;
function solution(input) {
  const n = Number(input[0]);
  const points = input.slice(1).map((line) => line.split(" ").map(Number));

  let area = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % n];

    area += x1 * y2 - x2 * y1;
  }

  return Math.abs(area) / 2;
}
console.log(solution(input).toFixed(1));

// input 예시
// 4
// 0 0
// 0 10
// 10 10
// 10 0
