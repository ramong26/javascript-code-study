// 문제 링크: [데스 나이트](https://www.acmicpc.net/problem/16948)

// 실행: node jincheol/week13/personal-BFS.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week13/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 보드의 크기
 * @param {[number, number]} start 시작하는 칸 [r1, c1]
 * @param {[number, number]} end 목표하는 칸 [r2, c2]
 * @returns
 */
const solution = (N, start, end) => {
  // 게임판, 이중 배열 형식이고 각 칸까지의 최소 거리를 저장
  const board = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => -1)
  );
  const goR = [-2, -2, 0, 0, 2, 2]; // 데스 나이트가 이동할 수 있는 r칸
  const goC = [-1, 1, -2, 2, -1, 1]; // 데이 나이트가 이동할 수 있는 c칸

  // BFS를 위한 큐
  const queue = [start]; // 방문할 칸들 [[r, c]] 형식
  board[start[0]][start[1]] = 0; // 처음 위치 초기화

  // 방문할 장소가 있을 경우
  while (queue.length) {
    const [r, c] = queue.shift(); // 방문한 장소 추출
    // 방문한 장소가 목표하는 칸일 경우 해당 칸까지의 최소 거리 return
    if (r === end[0] && c === end[1]) return board[r][c];

    // 데스 나이트의 이동 경로 순회
    for (let i = 0; i < 6; i++) {
      const nextR = r + goR[i]; // 이동할 r 좌표
      const nextC = c + goC[i]; // 이동할 c 좌표

      // 이동할 좌표가 칸을 벗어나는 경우 continue (음수, N보다 같거나 큰 경우 -> 인덱스 형식이라)
      if (nextR >= N || nextR < 0 || nextC >= N || nextC < 0) continue;

      // 다음으로 방문할 칸이 방문한 칸이 아닌 경우
      if (board[nextR][nextC] === -1) {
        board[nextR][nextC] = board[r][c] + 1; // 방문할 칸에 이동 횟수 저장 (현재 칸 + 1)
        queue.push([nextR, nextC]); // 방문할 칸 큐에 다음 칸 추가
      }
    }
  }

  // 방문할 수 있는 칸들을 모두 갔음에도 목표하는 칸에 도달하지 못한 경우 -1 return
  return -1;
};

const N = parseInt(input.shift());
const [r1, c1, r2, c2] = input[0].split(' ').map(Number);
console.log(solution(N, [r1, c1], [r2, c2]));
