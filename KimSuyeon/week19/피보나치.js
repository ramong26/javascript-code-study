// https://www.acmicpc.net/problem/17436
// 소수의 배수 - 골드 3

const input = require("fs")
  .readFileSync("./KimSuyeon/week19/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

//1부터 100까지 중에서 3의 배수가 몇 개냐?
function solution(input) {
  const [nStr, mStr] = input[0].split(" ");
  const N = Number(nStr); // 1
  const M = BigInt(mStr); // 100n

  const primes = input.slice(1).map(BigInt); // 3

  let answer = 0n;

  // 한번만 돎 1~(2^N -1)
  for (let mask = 1; mask < 1 << N; mask++) {
    let product = 1n;
    let count = 0;

    // 1번
    for (let i = 0; i < N; i++) {
      // 현재 마스크에 i번째 소수가 포함되어 있는지 확인 -> true면 곱셈 수행
      if (mask & (1 << i)) {
        //i번째 소수가 선택됐다면, product에 곱해줌
        // product = 1n * 3n = 3n
        product *= primes[i];

        // 1 번
        count++;
        if (product > M) break;
      }
    }

    // M보다 크면 어차피 몫이 0이니까 넘어감
    if (product > M) continue;

    // 포함된 소수 개수가 홀수면 더하고 짝수면 뺌
    if (count % 2 === 1) {
      // answer += 100n / 3n
      answer += M / product;
    } else {
      answer -= M / product;
    }
  }

  return answer;
}

console.log(solution(input).toString());

// input 예시
// 1 100
// 3
