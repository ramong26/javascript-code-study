// https://www.acmicpc.net/problem/1051
// 숫자 정사각형 - 실버 3

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
   .readFileSync("./KimSuyeon/week9/input1.txt", "utf-8")
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

// 직사각형이 주어지고 각 숫자를 좌표로 생각하고 이때 좌표를 연결해서 가장 큰 정사각형 넓이를 구해야 함
// 3 5
// 42101
// 22100
// 22101
// 여기서 (2,0) (2,2) (4,0) (4,2) 좌표를 연결하면 3*3 정사각형이 됨 따라서 출력 결과는 9

const N = input[0].split(' ').map(Number)[0]; // 11
const M = input[0].split(' ').map(Number)[1]; // 10

// 보드 판 만들기
const board = [];
for (let i = 1; i <= N; i++) {
  board.push(input[i].split('').map(Number));
}

// 이제 정사각형을 돌면서 가장 큰 정사각형 넓이를 구해야 함
let max = 1; // 가장 작은 정사각형 넓이
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // i,j에서 만들 수 있는 가장 큰 정사각형 넓이 구하기
    for (let k = 1; k <= Math.min(N - i, M - j); k++) {
      // k는 정사각형의 한 변의 길이
      if (
        board[i][j] === board[i + k - 1][j] &&
        board[i][j] === board[i][j + k - 1] &&
        board[i][j] === board[i + k - 1][j + k - 1]
      ) {
        max = Math.max(max, k * k);
      }
    }
  }
}
console.log(max);
