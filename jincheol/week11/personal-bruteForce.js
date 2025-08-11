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

const emptySpaces = [];

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const space = sudoku[row][col];
    if (space === 0) emptySpaces.push([row, col]);
  }
}

/**
 *
 * @param {number} emptyIdx 비어있는 칸 인덱스(emptySpaces의)
 * @returns
 */
const dfs = (emptyIdx) => {
  if (emptySpaces.length === emptyIdx) {
    sudoku.forEach((row) => {
      console.log(row.join(' '));
    });
    return true;
  }

  const [row, col] = emptySpaces[emptyIdx];
  for (let number = 1; number < 10; number++) {
    if (isOK(row, col, number)) {
      sudoku[row][col] = number;
      if (dfs(emptyIdx + 1)) return true;
      sudoku[row][col] = 0;
    }
  }
};

const isOK = (row, col, number) => {
  for (let i = 0; i < 9; i++) {
    const isSameNumber = sudoku[row][i] === number || sudoku[i][col] === number;
    if (isSameNumber) return false;
  }

  const squareStartRow = Math.floor(row / 3) * 3;
  const squareStartCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const squareNum = sudoku[squareStartRow + i][squareStartCol + j];
      if (squareNum === number) return false;
    }
  }

  return true;
};

dfs(0);
