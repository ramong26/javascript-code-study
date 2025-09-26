/** 
 * 분할정복 - 종이의 개수 (https://www.acmicpc.net/problem/1780)
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const paper = [];

  for (let i = 1; i <= N; i++) {
    paper.push(lines[i].split(' ').map(Number));
  }
  // [-1, 0, 1]의 개수
  const count = [0, 0, 0];

  const divide = (row, col, size) => {
    // 첫번째 값을 기준으로 설정
    let firstNum = paper[row][col];
    let isSame = true;

    for (let i = row; i < row + size; i++) {
      for (let j = col; j < col + size; j++) {
        if (firstNum !== paper[i][j]) {
          isSame = false;
          break;
        }
      }
      if (!isSame) break;
    }

    // 모든 값이 같으면 카운트 증가
    if (isSame) {
      count[firstNum+1]++;
      return;
    }

    const newSize = Math.floor(size / 3);

    // 3*3 격자로 분할
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        divide(
          row + i * newSize,
          col + j * newSize,
          newSize,
        )
      }
    }
  };

  divide(0, 0, N);

  return count.join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));