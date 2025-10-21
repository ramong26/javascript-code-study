// 문제 링크: [매직 스퀘어로 변경하기](https://www.acmicpc.net/problem/16945)

// 실행: node jincheol/week21/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week21/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number[]} square
 */
const solution = (square) => {
  const RAW = 15;

  const isMagicSquare = (square) => {
    for (let i = 0; i < 9; i += 3) {
      const rowSum = square[i] + square[i + 1] + square[i + 2];
      if (rowSum !== RAW) return false;
    }

    for (let i = 0; i < 3; i++) {
      const colSum = square[i] + square[i + 3] + square[i + 6];
      if (colSum !== RAW) return false;
    }

    if (square[0] + square[4] + square[8] !== RAW) return false;
    if (square[2] + square[4] + square[6] !== RAW) return false;

    return true;
  };

  let answer = Infinity;
  const magicSquare = new Array(9);
  const selectedNum = new Array(10).fill(false);

  const dfs = (depth) => {
    if (depth === 9) {
      if (isMagicSquare(magicSquare)) {
        let cost = 0;
        for (let i = 0; i < 9; i++) {
          cost += Math.abs(square[i] - magicSquare[i]);
        }
        answer = Math.min(answer, cost);
      }
      return;
    }

    for (let num = 1; num <= 9; num++) {
      if (selectedNum[num]) continue;

      selectedNum[num] = true;
      magicSquare[depth] = num;
      dfs(depth + 1);
      selectedNum[num] = false;
    }
  };

  dfs(0);

  return answer;
};

const square = input.flatMap((v) => v.trim().split(' ').map(Number));
console.log(solution(square));
