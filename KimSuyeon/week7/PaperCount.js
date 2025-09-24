// https://www.acmicpc.net/problem/1780
// 1780번: 종이의 개수 - 실버2

const input = require("fs")
  .readFileSync("./KimSuyeon/week7/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const totalLength = Number(input[0]);
const numberMap = input.slice(1).map((line) => line.split(" ").map(Number));

// 카운트 변수
let minusOneCount = 0;
let zeroCount = 0;
let oneCount = 0;

// (x, y) 위치에서 size x size 영역이 모두 같은 수인지 확인
function same(x, y, size, paper) {
  // 첫 번째 값과 비교
  const first = paper[x][y];

  // 영역 내 모든 값이 같은지 확인 totalLength까지
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      // 첫번째랑 같지 않으면 false 반환
      if (paper[i][j] !== first) return false;
    }
  }
  return true;
}

// 분할 정복 함수
function solve(x, y, size, paper) {
  // 모두 같은 경우
  if (same(x, y, size, paper)) {
    const value = paper[x][y];

    // 카운트 증가
    if (value === -1) minusOneCount++;
    else if (value === 0) zeroCount++;
    else oneCount++;
    return;
  }

  // 영역이 같지 않으면 3등분해서 각각 확인
  const newSize = size / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 현재 위치에서 새로운 크기로 분할하고 재귀 호출
      solve(x + i * newSize, y + j * newSize, newSize, paper);
    }
  }
}

// 실행
solve(0, 0, totalLength, numberMap);

console.log(minusOneCount);
console.log(zeroCount);
console.log(oneCount);

// input 예시
// 9
// 0 0 0 1 1 1 -1 -1 -1
// 0 0 0 1 1 1 -1 -1 -1
// 0 0 0 1 1 1 -1 -1 -1
// 1 1 1 0 0 0 0 0 0
// 1 1 1 0 0 0 0 0 0
// 1 1 1 0 0 0 0 0 0
// 0 1 -1 0 1 -1 0 1 -1
// 0 -1 1 0 1 -1 0 1 -1
// 0 1 -1 1 0 -1 0 1 -1
