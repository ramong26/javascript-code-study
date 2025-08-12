/**
 * 스도쿠
 * https://www.acmicpc.net/problem/2580
 * 이 게임은 아래 그림과 같이 가로, 세로 각각 9개씩 총 81개의 작은 칸으로 이루어진 정사각형 판 위에서 이뤄지는데, 게임 시작 전 일부 칸에는 1부터 9까지의 숫자 중 하나가 쓰여 있다.
 * 각각의 가로줄과 세로줄에는 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
 * 굵은 선으로 구분되어 있는 3x3 정사각형 안에도 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
 */

function solution(input) {
  const board = input.map(line => line.split(' ').map(Number));

  // 행 검사 함수
  function checkRow(board, row, num) {
    for (let col = 0; col < 9; col++) {
      // 이미 숫자가 같은 행에 존재할 경우 false 반환
      if (board[row][col] === num) {
        return false;
      }
    }
    return true;
  }

  // 열 검사 함수
  function checkCol(board, col, num) {
    for (let row = 0; row < 9; row++) {
      // 이미 숫자가 같은 열에 존재할 경우 false 반환
      if (board[row][col] === num) {
        return false;
      }
    }
    return true;
  }

  // 3 * 3 박스 검사 함수
  function checkBox(board, row, col, num) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function dfs(board) {
    // 빈칸 찾기
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // 1~9까지 시도해보기
          for (let num = 1; num <= 9; num++) {
            if (checkRow(board, row, num) &&
                checkCol(board, col, num) && 
                checkBox(board, row, col, num)) {

              // 유효하면 빈칸에 숫자를 대입
              board[row][col] = num;

              // 다음단계로 진행
              if (dfs(board)) {
                return true;  // 성공
              }

              // 실패하면 백트래킹
              board[row][col] = 0;
            }
          }
            
          // 1~9 모두 안되면 실패
          return false;
        }
      }
    }
    return true;
  }
  dfs(board);

  // 결과를 문자열로 만들어서 반환
  const result = [];
  for (let i = 0; i < 9; i++) {
    result.push(board[i].join(' '));
  }
  return result.join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

console.log(solution(input));
