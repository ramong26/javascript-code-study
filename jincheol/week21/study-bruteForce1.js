// 문제 링크: [파이프 옮기기 1](https://www.acmicpc.net/problem/17070)

// 실행: node jincheol/week21/study-bruteForce1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week21/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 파이프의 머리 부분만 생각하기
 * @param {number} N 방의 크기
 * @param {string[][]} room 방의 구조
 */
const solution = (N, room) => {
  let answer = 0; // 가능한 경우의 수

  // 파이프의 상태와 상관 없이 파이프 머리는 오른쪽, 아래, 대각선로 이동 가능
  // 파이프 머리의 위치를 받아 오른쪽, 아래, 대각선으로 갈 수 있는지 여부만 확인하는 함수들
  // 방을 벗어나지 않는지 확인 && 벽이 있는지 확인
  const canMoveRight = (row, col) => {
    return col + 1 < N && room[row][col + 1] === 0;
  };
  const canMoveDown = (row, col) => {
    return row + 1 < N && room[row + 1][col] === 0;
  };
  const canMoveDiagonal = (row, col) => {
    return (
      row + 1 < N &&
      col + 1 < N &&
      room[row][col + 1] === 0 &&
      room[row + 1][col] === 0 &&
      room[row + 1][col + 1] === 0
    );
  };

  /**
   *
   * @param {number} row 파이프 머리의 row 위치
   * @param {number} col 파이프 머리의 col 위치
   * @param {'가로'| '세로' | '대각선'} state 파이프의 현재 상태
   */
  const dfs = (row, col, state) => {
    // 파이프 머리가 방 끝에 도착했을 때
    if (row === N - 1 && col === N - 1) {
      answer++;
      return;
    }

    // 파이프가 현재 가로로 있을 때
    if (state === '가로') {
      // 가로일 때 파이프가 이동할 수 있는 경우를 확인
      // 이동 가능하면 이동한 파이프 머리 위치와 상태로 재귀 호출
      if (canMoveRight(row, col)) dfs(row, col + 1, '가로');
      if (canMoveDiagonal(row, col)) dfs(row + 1, col + 1, '대각선');
    }
    // 파이프가 현재 세로로 있을 때
    else if (state === '세로') {
      // 세로일 때 파이프가 이동할 수 있는 경우를 확인
      // 이동 가능하면 이동한 파이프 머리 위치와 상태로 재귀 호출
      if (canMoveDown(row, col)) dfs(row + 1, col, '세로');
      if (canMoveDiagonal(row, col)) dfs(row + 1, col + 1, '대각선');
    }
    // 파이프가 현재 대각선으로 있을 때
    else if (state === '대각선') {
      // 대각선일 때 파이프가 이동할 수 있는 경우를 확인
      // 이동 가능하면 이동한 파이프 머리 위치와 상태로 재귀 호출
      if (canMoveRight(row, col)) dfs(row, col + 1, '가로');
      if (canMoveDown(row, col)) dfs(row + 1, col, '세로');
      if (canMoveDiagonal(row, col)) dfs(row + 1, col + 1, '대각선');
    }
  };

  dfs(0, 1, '가로'); // 처음 파이프 머리 위치와 상태로 탐색 시작

  return answer;
};

const N = parseInt(input.shift());
const room = input.map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, room));
