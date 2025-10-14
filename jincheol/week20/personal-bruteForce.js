// 문제 링크: [치킨 배달](https://www.acmicpc.net/problem/15686)

// 실행: node jincheol/week20/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week20/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N
 * @param {number} M
 * @param {number[][]} map
 */
const solution = (N, M, map) => {
  const houses = [];
  const chickens = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const place = map[row][col];
      if (place === 1) houses.push([row, col]);
      else if (place === 2) chickens.push([row, col]);
    }
  }

  const H = houses.length;
  const C = chickens.length;

  const chickenRoads = Array.from({ length: H }, () => Array(C).fill(0));

  for (let h = 0; h < H; h++) {
    const [hRow, hCol] = houses[h];
    for (let c = 0; c < C; c++) {
      const [cRow, cCol] = chickens[c];
      chickenRoads[h][c] = Math.abs(hRow - cRow) + Math.abs(hCol - cCol);
    }
  }

  let answer = Infinity;
  const chickenQueue = [];

  /**
   *
   * @param {number} start
   * @param {number} depth
   * @returns
   */
  const dfs = (start, depth) => {
    if (depth === M) {
      let totalChickenRoad = 0;
      for (let h = 0; h < H; h++) {
        let minDist = Infinity;
        for (let i = 0; i < chickenQueue.length; i++) {
          const chickenIdx = chickenQueue[i];
          if (chickenRoads[h][chickenIdx] < minDist) {
            minDist = chickenRoads[h][chickenIdx];
          }
        }
        totalChickenRoad += minDist;
        if (totalChickenRoad >= answer) return;
      }
      if (totalChickenRoad < answer) answer = totalChickenRoad;
      return;
    }

    for (let i = start; i < C; i++) {
      chickenQueue.push(i);
      dfs(i + 1, depth + 1);
      chickenQueue.pop();
    }
  };

  if (C <= M) {
    let sum = 0;
    for (let h = 0; h < H; h++) {
      let minDist = Infinity;
      for (let c = 0; c < C; c++) {
        if (chickenRoads[h][c] < minDist) minDist = chickenRoads[h][c];
      }
      sum += minDist;
    }
    return sum;
  }

  dfs(0, 0);
  return answer;
};

const [N, M] = input.shift().split(' ').map(Number);
const map = input.map((v) => v.split(' ').map(Number));
console.log(solution(N, M, map));
