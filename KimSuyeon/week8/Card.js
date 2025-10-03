// https://www.acmicpc.net/problem/11652
// 11652번: 카드 - 실버4

const input = require("fs")
  .readFileSync("./KimSuyeon/week8/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const totalLength = Number(input[0]); // 총 카드 수 = 6
// const cards = input.slice(1).map((v) => Number(v)); // 숫자로 변환 -> [ 1, 2, 1, 2, 1, 2 ] =>  Number로 변환하면 정밀도 손실 발생할 수 있음 -> 따라서 17줄 처럼 문자열로 처리

const cardMap = new Map(); // Map(3) { 1 => 3, 2 => 3 }

for (let i = 1; i <= totalLength; i++) {
  const card = input[i]; // 문자열로 처리
  if (cardMap.has(card)) {
    cardMap.set(card, cardMap.get(card) + 1); // 이미 등장한 카드면 개수 +1
  } else {
    cardMap.set(card, 1); // 처음 등장하는 카드면 1로 초기화
  }
}

console.log(cardMap); //Map(2) { 1 => 3, 2 => 3 }

// 이제 정렬을 통해 가장 많이 등장한 카드 찾아 정렬하기
const sorted = [...cardMap.entries()].sort(
  (a, b) => b[1] - a[1] || (BigInt(a[0]) < BigInt(b[0]) ? -1 : 1) // 등장횟수 내림차순, 같으면 카드번호 오름차순 -> BigInt로 변환 후 비교 (카드 번호가 10억까지 가능하기 때문)
);

console.log(sorted[0][0]); // 제일 앞에 있는 카드의 숫자 출력

// input example
// 6
// 1
// 2
// 1
// 2
// 1
// 2
