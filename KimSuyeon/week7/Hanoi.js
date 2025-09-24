// https://www.acmicpc.net/problem/11729
// 11729번: 하노이 탑 이동 순서 - 실버3

const input = require("fs")
  .readFileSync("./KimSuyeon/week7/input.txt", "utf-8")
  .trim();
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const N = Number(input); // 3

let result = [];

// 재귀 함수 hanoi
// n : 옮길 원판 개수
// from : 출발 기둥 (현재 원판 위치)
// via  : 보조 기둥 (임시로 사용할 기둥)
// to   : 목표 기둥
function hanoi(n, from, via, to) {
  if (n === 1) {
    // 원판 1개는 바로 목표 장대로 이동
    result.push(`${from} ${to}`);
    return;
  }

  // 1. n-1개 원판을 출발(from) → 보조(via) 장대로 이동 따라서 via가 to 역할
  hanoi(n - 1, from, to, via);

  // 2. 가장 큰 원판을 출발(from) → 목표(to) 장대로 이동
  result.push(`${from} ${to}`);

  // 3. n-1개 원판을 보조(via) → 목표(to) 장대로 이동
  hanoi(n - 1, via, from, to);
}
// 하노이 함수 호출 (1번 장대 → 3번 장대)
hanoi(N, 1, 2, 3);

// 결과 출력
console.log(result.length);
console.log(result.join("\n"));

// input 예시
// 3
