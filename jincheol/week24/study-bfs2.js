// 문제 링크: [물통](https://www.acmicpc.net/problem/2251)

// 실행: node jincheol/week24/study-bfs2.js

/**
 *
 * @param {number} A 물통 A
 * @param {number} B 물통 B
 * @param {number} C 물통 C
 */
const solution = (A, B, C) => {
  const answer = new Set(); // 정답을 저장할 Set
  // A와 B의 양을 기준으로 방문 여부를 저장
  const visited = Array.from({ length: A + 1 }, () =>
    new Array(B + 1).fill(false)
  );

  const maxWater = [A, B, C]; // 물통을 인덱스로 조회할 수 있는 배열
  const queue = [[0, 0, C]]; // bfs를 위한 큐
  visited[0][0] = true; // 초기화
  let idx = 0; // 큐의 포인터

  // bfs 탐색
  while (idx < queue.length) {
    const [a, b, c] = queue[idx++]; // 큐에서 추출
    if (a === 0) answer.add(c); // 조건 통과 시 저장

    const curWater = [a, b, c]; // 현재 물통

    // 물을 옮길 수 있는 6가지 경우 탐색
    for (let f = 0; f < 3; f++) {
      for (let t = 0; t < 3; t++) {
        if (f === t) continue; // 같은 물통으로 옮기는 경우는 건너뛰기

        const from = curWater[f]; // 물을 옮길 물통
        const to = curWater[t]; // 물을 받을 뭍롱
        const maxTo = maxWater[t]; // 받는 물통의 최대 용량
        if (from === 0) continue; // 물을 옮길 수 없으면 건너뛰기

        const canMoveWater = maxTo - to; // to로 옮길 수 있는 최대 양
        const realMoveWater = Math.min(from, canMoveWater); // 실제로 옮기는 양 (from의 모든 물과 to의 최대 물 중 최솟 값)
        if (realMoveWater <= 0) continue; // 실제로 옮기는 물이 없으면 건너뛰기

        const newWater = [...curWater]; // 옮긴 후의 물통들
        newWater[f] -= realMoveWater; // from 물통 변화
        newWater[t] += realMoveWater; // to 물통 변화

        const [newA, newB, newC] = newWater;
        // 변화된 물통을 방문한 적이 없으면
        if (!visited[newA][newB]) {
          visited[newA][newB] = true; // 방문 처리
          queue.push(newWater); // 큐에 추가
        }
      }
    }
  }

  // 오름차순 문자열로 만들어서 출력
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
