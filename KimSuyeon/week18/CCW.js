// https://www.acmicpc.net/problem/11758
// CCW (Counter Clock Wise) 골드 5

const input = require("fs")
  .readFileSync("./KimSuyeon/week18/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 총 5가지 경우의 수
// 1. A, B, C가 일직선 상에 있는 경우 (0) 1가지
// 2. A, B, C가 반시계 방향으로 회전하는 경우 (1) 2가지
// 3. A, B, C가 시계 방향으로 회전하는 경우 (-1) 2가지

function solution(input) {
  const [x1, y1] = input[0].split(" ").map(Number);
  const [x2, y2] = input[1].split(" ").map(Number);
  const [x3, y3] = input[2].split(" ").map(Number);

  const ccw = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);

  if (ccw > 0) return 1;
  if (ccw < 0) return -1;
  return 0;
}
console.log(solution(input));

// 틀림;;;
// 증가량의 크기 비교으로 판단하는게 아니라 방향 비교로 해야함
// function solution(input) {
//   const [x1, y1] = input[0].split(" ").map(Number);
//   const [x2, y2] = input[1].split(" ").map(Number);
//   const [x3, y3] = input[2].split(" ").map(Number);

//   // 각 점의 좌표를 이용해 양수인지 음수인지 판단
//   // 만약 diff1이 양수면 올라가는 모양, 음수면 내려가는 방향
//   // diff2도 마찬가지
//   // 위 두가지를 종합해서 리턴값 결정
//   const diff1 = (x2 - x1) * (y2 - y1);
//   const diff2 = (x3 - x2) * (y3 - y2);

//   //Math.sign은 자바스크립트에서 숫자의 부호(+, -, 0)를 반환하는 함수
//   switch (Math.sign(diff1 - diff2)) {
//     case 1:
//       return 1; // 반시계 방향
//     case -1:
//       return -1; // 시계 방향
//     case 0:
//       return 0; // 일직선
//   }
// }

// console.log(solution(input));

// input 예시
// 1 1
// 7 3
// 5 5
