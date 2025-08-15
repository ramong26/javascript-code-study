// 문제 링크: [스도쿠](https://www.acmicpc.net/problem/2580)

// 실행: node jincheol/week11/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week11/input3.txt')
  .toString()
  .trim()
  .split('\n');

const sudoku = input.map((row) => row.split(' ').map(Number));

const emptySpaces = []; // 비어있는 칸들

// 각 칸들을 순회하면서
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const space = sudoku[row][col];
    // 해단 칸이 0이면 emptySpaces에 추가
    if (space === 0) emptySpaces.push([row, col]);
  }
}

/**
 *
 * @param {number} emptyIdx 현재 확인하는 비어있는 칸 인덱스(emptySpaces의)
 * @returns
 */
const dfs = (emptyIdx) => {
  // 비어있는 칸의 개수가 emptyIdx와 같으면
  if (emptySpaces.length === emptyIdx) {
    // 콘솔 출력
    sudoku.forEach((row) => {
      console.log(row.join(' '));
    });
    return true;
  }

  // 비어있는 칸의 row index와 col index
  const [row, col] = emptySpaces[emptyIdx];
  // 1 ~ 9 순회하면서
  for (let number = 1; number < 10; number++) {
    // 숫자를 해당 칸에 넣었을 때 조건에 위배되는지 확인
    if (isOK(row, col, number)) {
      sudoku[row][col] = number; // 숫자를 할당
      // 종료를 했을 때 백트래킹 방지를 위해 return
      if (dfs(emptyIdx + 1)) return true;
      sudoku[row][col] = 0; // 백트래킹
    }
  }
};

/**
 *
 * @param {number} row row index
 * @param {number} col col index
 * @param {number} number row와 col에 추가할 숫자
 * @returns
 */
const isOK = (row, col, number) => {
  // row와 col에 동일한 숫자가 있는지 확인
  for (let i = 0; i < 9; i++) {
    const isSameNumber = sudoku[row][i] === number || sudoku[i][col] === number;
    if (isSameNumber) return false;
  }

  // 정사각형 칸에 동일한 숫자가 있는지 확인
  const squareStartRow = Math.floor(row / 3) * 3; // 정사각형의 row 시작 인덱스 계산
  const squareStartCol = Math.floor(col / 3) * 3; // 정사각형의 col 시작 인덱스 계산
  // 시작 인덱스부터 3칸씩 순회
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 해당 칸의 숫자와 같은 숫자인지 확인
      const squareNum = sudoku[squareStartRow + i][squareStartCol + j];
      if (squareNum === number) return false;
    }
  }

  // 조건 통과
  return true;
};

dfs(0);
