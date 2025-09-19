// 10815번: 숫자 카드
// https://www.acmicpc.net/problem/10815

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week6/input1.txt", "utf-8")
  .trim();
// 백준 제출 시에는 아래 코드 사용
// const input = require('fs').readFileSync('/dev/stdin').toString().trim();

const skCard = input.split("\n")[1].split(" ").map(Number); // 상근이 카드 [ 6, 3, 2, 10, -10 ]
const targetCards = input.split("\n")[3].split(" ").map(Number); // 주어진 카드 [ 10, 9, -5, 2, 3, 4, 5, -10 ]

const skSet = new Set(skCard); // Set(5) { 6, 3, 2, 10, -10 }

// skCard에 targetCards 가 있는지 확인해서 있으면 1 없으면 0
function solution() {
  let answer = [];

  // targetCards 기준으로, 돌면서 skSet에 있는지 확인해서 있으면 1 없으면 0
  for (let i = 0; i < targetCards.length; i++) {
    if (skSet.has(targetCards[i])) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }
  return answer.join(" ");
}

console.log(solution());

// input
// 5
// 6 3 2 10 -10
// 8
// 10 9 -5 2 3 4 5 -10
