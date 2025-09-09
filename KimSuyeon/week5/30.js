// 30
// https://www.acmicpc.net/problem/10610

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week5/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let N = input[0]; // 80875542
let splitNumber = N.split("");

// 30의 배수가 될려면 10과 3의 배수여야함
// 10의 배수 = 0으로 끝남
// 3의 배수 = 각 자리수의 합이 3의 배수
function solution() {
  // 10의 배수인지 확인 -> 0이 포함되어 있는지 확인
  if (!splitNumber.includes("0")) return -1;

  // 3의 배수인지 확인 -> 각 자리수의 합이 3의 배수인지 확인
  let sum = splitNumber.reduce((a, b) => a + Number(b), 0);
  if (sum % 3 !== 0) return -1;

  // 가장 큰 수대로 정렬하고 join
  return splitNumber.sort((a, b) => b - a).join("");
}

console.log(solution());

// input
//80875542
