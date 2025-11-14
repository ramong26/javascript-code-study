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
  if (S === G) return 0; // 현재 층이 목표하는 층이면 0

  const visited = new Array(F + 1).fill(0); // 방문 여부와 누른 횟수를 저장할 배열 0 = 미방문
  const queue = [S]; // bfs 큐
  visited[S] = 1; // 초기화 (다음 층에 도착했을 때 누른 횟수를 저장)
  let idx = 0; // 큐의 포인터

  // bfs 탐색
  while (idx < queue.length) {
    const curFloor = queue[idx++]; // 현재 위치한 층
    const curCount = visited[curFloor]; // 현재 버튼 누른 횟수

    const nextFloors = [curFloor + U, curFloor - D]; // 위 또는 아래로 이동했을 때의 층
    // 다음 이동 층 순회
    for (const next of nextFloors) {
      if (next === G) return curCount; // 목표하는 층이면 버튼 횟수 return (이미 +1을 한 상태임)

      // 다음 층이 건물의 층 범위이면서 방문하지 않은 층일 때
      if (next > 0 && next <= F && visited[next] === 0) {
        visited[next] = curCount + 1; // 방문 여부 표시와 누른 횟수 저장 (+ 1)
        queue.push(next); // 큐에 추가
      }
    }
  }

  return 'use the stairs'; // bfs 탐색 중 return하지 못하면 도착 불가능
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
