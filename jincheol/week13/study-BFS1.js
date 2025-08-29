// 문제 링크: [뱀과 사다리 게임](https://www.acmicpc.net/problem/16928)

// 실행: node jincheol/week13/study-BFS1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week13/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 사다리의 개수
 * @param {number} M 뱀의 개수
 * @param {Map<number, number>} ladders 사다리의 정보
 * @param {Map<number, number>} snakes 뱀의 정보
 */
const solution = (N, M, ladders, snakes) => {
  const board = Array.from({ length: 101 }, () => -1); // 게임 판 (각 칸마다 주사위 횟수 저장)

  // BFS를 위한 큐
  const queue = [1]; // 방문할 칸 저장
  board[1] = 0; // 시작 칸 초기화

  // 방문할 장소가 있을 경우
  while (queue.length) {
    const curSpace = queue.shift(); // 방문할 장소 추출

    // 도착한 지점이 마지막 칸일 경우 주사위 횟수 return
    if (curSpace === 100) return board[100];

    // 주사위 굴리기
    for (let i = 1; i <= 6; i++) {
      let nextSpace = curSpace + i; // 주사위를 굴렸을 때 도착하는 칸

      // 방문할 장소가 보드를 벗어나는 경우 continue
      if (nextSpace > 100) continue;

      // 방문할 장소가 사다리거나 뱀일 경우 nextSpace 변경
      if (ladders.has(nextSpace)) {
        nextSpace = ladders.get(nextSpace);
      } else if (snakes.has(nextSpace)) {
        nextSpace = snakes.get(nextSpace);
      }

      // 다음 장소가 방문하지 않은 장소일 경우
      if (board[nextSpace] === -1) {
        board[nextSpace] = board[curSpace] + 1; // 방문 처리 (해당 칸까지의 주사위 횟수)
        queue.push(nextSpace); // 큐에 추가
      }
    }
  }
};

const [N, M] = input.shift().split(' ').map(Number);
const ladders = new Map();
const snakes = new Map();

for (let i = 0; i < N; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  ladders.set(x, y);
}
for (let i = N; i < N + M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  snakes.set(u, v);
}

console.log(solution(N, M, ladders, snakes));
