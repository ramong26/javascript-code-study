// 문제 링크: [스타트링크](https://www.acmicpc.net/problem/5014)

// 실행: node jincheol/week24/personal-bfs.js

/**
 *
 * @param {number} F 건물의 층 수
 * @param {number} S 현재 위치한 층
 * @param {number} G 스타트링크가 위치한 층
 * @param {number} U 위로 U층을 가는 버튼
 * @param {number} D 아래로 D층을 가는 버튼
 */
const solution = (F, S, G, U, D) => {
  if (S === G) return 0;

  const visited = new Array(F + 1).fill(0);
  const queue = [S];
  visited[S] = 1;
  let idx = 0;

  while (idx < queue.length) {
    const curFloor = queue[idx++];
    const curCount = visited[curFloor];

    const nextFloors = [curFloor + U, curFloor - D];
    for (const next of nextFloors) {
      if (next === G) return curCount;

      if (next > 0 && next <= F && visited[next] === 0) {
        visited[next] = curCount + 1;
        queue.push(next);
      }
    }
  }

  return 'use the stairs';
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [F, S, G, U, D] = input[0].split(' ').map(Number);
console.log(solution(F, S, G, U, D));
