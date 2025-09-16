// 10816번: 숫자 카드 2
// https://www.acmicpc.net/problem/10816

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week6/input2.txt", "utf-8")
  .trim();
// 백준 제출 시에는 아래 코드 사용
// const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// 상근이 카드와 찾을 카드 배열
const skCard = input.split("\n")[1].split(" ").map(Number); // 상근이 카드
const targetCards = input.split("\n")[3].split(" ").map(Number); // 주어진 카드

// 숫자카드 1처럼 단순 for문을 이용해서 찾는 방법은 시간 초과 발생 ㅠ0ㅠ

// Map 자료구조를 이용해서 각 카드의 개수를 저장
const skMap = new Map();
// set card로 기존에 있었던 숫자 카드면 +1 아니면 0으로
// Map(6) { 6 => 1, 3 => 2, 2 => 1, 10 => 3, -10 => 2, 7 => 1 }
for (const card of skCard) {
  skMap.set(card, (skMap.get(card) || 0) + 1);
}

// targetCards 기준으로, 돌면서 skMap에 있는지 확인해서 있으면 개수 없으면 0
function solution() {
  return targetCards.map((card) => skMap.get(card) || 0).join(" ");
}
console.log(solution());

// input 예시
// 10
// 6 3 2 10 10 10 -10 -10 7 3
// 8
// 10 9 -5 2 3 4 5 -10
