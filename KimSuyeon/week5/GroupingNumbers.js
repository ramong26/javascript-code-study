// 수 묶기
// https://www.acmicpc.net/problem/1744

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week5/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const arr = input.slice(1).map(Number); // [ -1, 2, 1, 3 ]

let plus = arr.filter((n) => n > 1).sort((a, b) => b - a); //[ 3, 2 ]
let minus = arr.filter((n) => n < 0).sort((a, b) => a - b); //[ -1 ]
let ones = arr.filter((n) => n === 1); // [ 1 ]
let zeros = arr.filter((n) => n === 0);

function solution() {
  let answer = 0;

  // 양수끼리 짝 지어서 곱함
  for (let i = 0; i < plus.length; i += 2) {
    if (i + 1 < plus.length) {
      answer += plus[i] * plus[i + 1];
    } else {
      answer += plus[i];
    }
  }

  // 음수끼리 짝 지어서 곱함
  for (let i = 0; i < minus.length; i += 2) {
    if (i + 1 < minus.length) {
      answer += minus[i] * minus[i + 1];

      // 마지막 남는 음수인데 0이 없으면 answer에 더함 0이있으면 따로 뭘하지 않음 -> 즉 0이 곱해지는 효과
    } else if (zeros.length === 0) {
      answer += minus[i];
    }
  }
  answer += ones.reduce((a, b) => a + b, 0);
  return answer;
}

console.log(solution());

// input
// 4
// -1
// 2
// 1
// 3
