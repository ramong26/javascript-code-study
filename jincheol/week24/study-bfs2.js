// 문제 링크: [물통](https://www.acmicpc.net/problem/2251)

// 실행: node jincheol/week24/study-bfs2.js

/**
 *
 * @param {number} A 물통 A
 * @param {number} B 물통 B
 * @param {number} C 물통 C
 */
const solution = (A, B, C) => {
  const answer = new Set();
  const visited = Array.from({ length: A + 1 }, () =>
    new Array(B + 1).fill(false)
  );

  const maxWater = [A, B, C];
  const queue = [[0, 0, C]];
  visited[0][0] = true;
  let idx = 0;

  while (idx < queue.length) {
    const [a, b, c] = queue[idx++];
    if (a === 0) answer.add(c);

    const curWater = [a, b, c];

    for (let f = 0; f < 3; f++) {
      for (let t = 0; t < 3; t++) {
        if (f === t) continue;

        const from = curWater[f];
        const to = curWater[t];
        const maxTo = maxWater[t];
        if (from === 0) continue;

        const canMoveWater = maxTo - to;
        const realMoveWater = Math.min(from, canMoveWater);
        if (realMoveWater <= 0) continue;

        const newWater = [...curWater];
        newWater[f] -= realMoveWater;
        newWater[t] += realMoveWater;

        const [newA, newB, newC] = newWater;
        if (!visited[newA][newB]) {
          visited[newA][newB] = true;
          queue.push(newWater);
        }
      }
    }
  }

  return Array.from(answer)
    .sort((a, b) => a - b)
    .join(' ');
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [A, B, C] = input[0].split(' ').map(Number);
console.log(solution(A, B, C));
