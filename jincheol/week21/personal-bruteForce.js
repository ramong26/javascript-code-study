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
 * @param {number[]} square 처음 상태
 */
const solution = (square) => {
  const RAW = 15; // 매직 스퀘어는 합이 15

  /**
   * 매직 스퀘어인지 확인하는 함수
   * @param {number[]} square
   * @returns {boolean}
   */
  const isMagicSquare = (square) => {
    // 행의 합이 15인지 확인
    for (let i = 0; i < 9; i += 3) {
      const rowSum = square[i] + square[i + 1] + square[i + 2];
      if (rowSum !== RAW) return false;
    }
    // 열의 합이 15인지 확인
    for (let i = 0; i < 3; i++) {
      const colSum = square[i] + square[i + 3] + square[i + 6];
      if (colSum !== RAW) return false;
    }
    // 대각선의 합이 15인지 확인
    if (square[0] + square[4] + square[8] !== RAW) return false;
    if (square[2] + square[4] + square[6] !== RAW) return false;

    return true;
  };

  let answer = Infinity;
  const magicSquare = new Array(9); // 현재 탐색하는 스퀘어의 일차원 배열
  const selectedNum = new Array(10).fill(false); // 이미 사용한 숫자인지 확인하는 배열 (1 base)

  /**
   *
   * @param {number} depth 현재 선택한 숫자 개수
   */
  const dfs = (depth) => {
    // 모든 숫자를 선택했을 때
    if (depth === 9) {
      // 매직 스퀘어일 경우 변환 비용 계산
      if (isMagicSquare(magicSquare)) {
        let cost = 0;
        // 모든 원소를 순회하며 처음 스퀘어의 원소와의 변환 비용 계산
        for (let i = 0; i < 9; i++) {
          cost += Math.abs(square[i] - magicSquare[i]);
        }
        answer = Math.min(answer, cost); // 정답 갱신
      }
      return; // 탐색 종료
    }

    // 숫자 9개를 다 선택하지 않은 상태일 때 새로운 숫자 선택
    for (let num = 1; num <= 9; num++) {
      if (selectedNum[num]) continue; // 이미 선택한 숫자면 건너뛰기

      selectedNum[num] = true; // 선택 여부 체크
      magicSquare[depth] = num; // 현재 숫자를 스퀘어에 할당
      dfs(depth + 1); // 재귀 탐색
      selectedNum[num] = false; // 백트래킹
    }
  };

  dfs(0); // 탐색 시작

  return answer;
};

// 계산의 편의를 위해 1차원 배열로 사용
const square = input.flatMap((v) => v.trim().split(' ').map(Number));
console.log(solution(square));
