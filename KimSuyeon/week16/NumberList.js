// https://www.acmicpc.net/problem/5052
// 5052 - 전화번호 목록 - 골드 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week16/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const testfFuncion = (n, array) => {
  array.sort(); // 전화번호 정렬
  for (let i = 0; i < n - 1; i++) {
    // 앞 번호가 뒷 번호의 접두어인지 확인
    if (array[i + 1].startsWith(array[i])) {
      return "NO";
    }
  }
  return "YES";
};

function solution(input) {
  const N = Number(input[0]); // 총 테스트 케이스 수
  let plus = 0;
  let result = [];

  // 각 테스트 케이스별로 처리
  for (let k = 0; k < N; k++) {
    const count = Number(input[1 + plus]);
    const numbers = input.slice(2 + plus, 2 + plus + count);
    result.push(testfFuncion(count, numbers));
    plus += count + 1;
  }
  return result.join("\n");
}

console.log(solution(input));
// input 예시
// 2
// 3
// 911
// 97625999
// 91125426
// 5
// 113
// 12340
// 123440
// 12345
// 98346
