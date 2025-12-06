// https://www.acmicpc.net/problem/14426
// 14426 - 접두사 찾기 - 실버 1

const input = require("fs")
  .readFileSync("./KimSuyeon/week16/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const S = input.slice(1, N + 1).sort(); // 시작 인덱스 1 (두 번째 줄, 첫 번째 문자열), 끝 인덱스 N+1 (N개의 문자열)
  const queries = input.slice(N + 1, N + M + 1); // 접두사 쿼리들
  let count = 0;

  for (let q of queries) {
    let left = 0;
    let right = S.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (S[mid] < q) left = mid + 1;
      else right = mid;
    }

    if (left < S.length && S[left].startsWith(q)) {
      count++;
    }
  }

  return count;
}

console.log(solution(input));

// input 예시
// 5 10
// baekjoononlinejudge
// startlink
// codeplus
// sundaycoding
// codingsh
// baekjoon
// star
// start
// code
// sunday
// coding
// cod
// online
// judge
// plus
