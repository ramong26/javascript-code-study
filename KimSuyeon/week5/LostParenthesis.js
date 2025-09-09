// 잃어버린 괄호
//https://www.acmicpc.net/problem/1541

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week5/input1.txt", "utf-8")
  .trim();
// 백준 제출 시에는 아래 코드 사용
// const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// -기준으로 분리
let expression = input.split("-"); // [ '55', '50+40' ]

// 분리된 각 부분을 다 더함 ex) 50+40 = 90
let summed = expression.map((part) =>
  part
    .split("+")
    .map(Number)
    .reduce((a, b) => a + b, 0)
);

// 첫 그룹은 더하고 나머지는 - 기준으로 분리한거니 다 빼기
function solution() {
  let sum = summed[0]; // 첫 그룹은 그대로 더하기

  // 나머지 그룹은 한 번에 빼기
  for (let i = 1; i < summed.length; i++) {
    sum -= summed[i];
  }

  return sum;
}

console.log(solution());

// input
// 55-50+40
