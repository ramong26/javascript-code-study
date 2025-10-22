// https://www.acmicpc.net/problem/16945
// 매직 스퀘어로 변경하기

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('./KimSuyeon/week11/input3.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

// 문제요약 3 * 3으로 된 판을 가로 세로 대각선으로 더했을 때 그 합이 같아야 하며,
// 같지 않았을 때 숫자를 바꿔서 같게 만들어라
// 각 9칸은 숫자 1~9까지 하나씩만 들어올 수 있다.
const board = input.map((line) => line.split(' ').map(Number));

// 가운데를 5로 두고 합이 15가 되는건 총 8개 밖에 없음
const magicSquares = [
  [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8],
  ],
  [
    [6, 1, 8],
    [7, 5, 3],
    [2, 9, 4],
  ],
  [
    [8, 3, 4],
    [1, 5, 9],
    [6, 7, 2],
  ],
  [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ],
  [
    [6, 7, 2],
    [1, 5, 9],
    [8, 3, 4],
  ],
  [
    [8, 1, 6],
    [3, 5, 7],
    [4, 9, 2],
  ],
  [
    [4, 3, 8],
    [9, 5, 1],
    [2, 7, 6],
  ],
  [
    [2, 9, 4],
    [7, 5, 3],
    [6, 1, 8],
  ],
];

let minCost = Infinity;

// 매직스퀘어를 돌아서 예시와 가장 비슷한 매직스퀘어를 찾고 해당 변경 비용 최소 찾기
for (let magic of magicSquares) {
  let cost = 0; // 비용초기화

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cost += Math.abs(board[i][j] - magic[i][j]); // 절댓값 -> 한 칸에 있는 수 a를 b로 변경하는 비용은 |a - b|
    }
  }
  // 계속 돌면서 최소 변경값이 나오면 minCost에 저장하고 또 돌아서 최소가 나오면 minCost에 저장
  minCost = Math.min(minCost, cost);
}

console.log(minCost);
// input 예시
// 4 8 2
// 4 5 7
// 6 1 6
