// 문제 링크: [아기 상어 2](https://www.acmicpc.net/problem/17086)

// 실행: node jincheol/week24/study-bfs1.js

/**
 *
 * @param {number} N 행의 개수
 * @param {number} M 열의 개수
 * @param {number[][]} board 공간의 상태
 */
const solution = (N, M, board) => {
  // 이동하는 index
  const move = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const safeDistance = Array.from({ length: N }, () => new Array(M).fill(0)); // 거리를 저장할 배열

  const queue = []; // bfs 큐
  // 상어 위치를 시작 지점으로 설정
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      // 상어면
      if (board[r][c] === 1) {
        queue.push([r, c]); // 큐에 추가
        safeDistance[r][c] = 1; // 거리를 1로 시작
      }
    }
  }

  let idx = 0; // queue의 포인터
  let max = 0; // 최대 거리

  while (idx < queue.length) {
    const [r, c] = queue[idx++]; // 방문지 추출 + idx 늘리기
    let curDistance = safeDistance[r][c]; // r c의 안전 거리
    // 8방향 이동
    for (const [dr, dc] of move) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || N <= nr || nc < 0 || M <= nc) continue; // 보드를 벗어나면 건너뛰기
      // 방문하지 않은 칸일 경우
      if (safeDistance[nr][nc] === 0) {
        safeDistance[nr][nc] = curDistance + 1; // 안전 거리 + 1 저장
        queue.push([nr, nc]); // 큐에 방문지 추가
        max = Math.max(max, safeDistance[nr][nc] - 1); // 최댓값 갱신
      }
    }
  }

  return max;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, board));
