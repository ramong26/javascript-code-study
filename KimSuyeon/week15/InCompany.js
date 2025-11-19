//https://www.acmicpc.net/problem/7785
// 7785 - 회사에 있는 사람 - 실버 5

const input = require("fs")
  .readFileSync("./KimSuyeon/week15/input3.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 퇴근 기록만 파악해서 회사에 남아있는 사람을 출력ㅇ
function solution(input) {
  const N = Number(input[0]);
  const record = new Map();

  for (let i = 1; i <= N; i++) {
    const [name, status] = input[i].split(" ");
    record.set(name, status);
  }

  for (const [name, status] of record) {
    if (status === "leave") {
      record.delete(name);
    }
  }

  // 이름만 추출
  return Array.from(record.keys()).sort().reverse();
}
console.log(solution(input).join("\n"));

// input 예시
// 4
// Baha enter
// Askar enter
// Baha leave
// Artem enter
