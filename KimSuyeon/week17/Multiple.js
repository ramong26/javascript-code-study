// https://www.acmicpc.net/problem/1629
// 1629 - 곱셈 - 실버 1

const input = require("fs")
  .readFileSync("./KimSuyeon/week17/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const [A, B, C] = input[0].split(" ").map(BigInt);

  const modPow = (A, B, C) => {
    if (B === 0n) return 1n;
    const half = modPow(A, B / 2n, C);
    const result = (half * half) % C;
    return B % 2n === 0n ? result : (result * A) % C;
  };

  return modPow(A, B, C).toString();
}

console.log(solution(input));
// input 예시
// 10 11 12
