// https://www.acmicpc.net/problem/17436
// 소수의 배수 - 골드 3

const input = require("fs")
  .readFileSync("./KimSuyeon/week19/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const N = Number(input[0]);
  const M = BigInt(input[1]);
  const primes = input.slice(2).map(BigInt);

  let answer = 0n;

  for (let mask = 1; mask < 1 << N; mask++) {
    let product = 1n;
    let count = 0;

    for (let i = 0; i < N; i++) {
      if (mask & (1 << i)) {
        product *= primes[i];
        count++;
        if (product > M) break;
      }
    }

    if (product > M) continue;

    if (count % 2 === 1) {
      answer += M / product;
    } else {
      answer -= M / product;
    }
  }

  return answer;
}

console.log(solution(n)[0].toString());

// input 예시
// 1 100
// 3
