/*
분할정복 - 별찍기 (https://www.acmicpc.net/problem/2447)
재귀적인 패턴으로 별을 찍어 보자. N이 3의 거듭제곱(3, 9, 27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다.
크기 3의 패턴은 가운데에 공백이 있고, 가운데를 제외한 모든 칸에 별이 하나씩 있는 패턴이다.
N이 3보다 클 경우, 크기 N의 패턴은 공백으로 채워진 가운데의 (N/3)×(N/3) 정사각형을 크기 N/3의 패턴으로 둘러싼 형태이다. 예를 들어 크기 27의 패턴은 예제 출력 1과 같다.
정사각형 크기: N × N
공백: (N/3)×(N/3)
 */

function solution(input) {
  const N = Number(input);
  const array = Array.from({length: N}, () => Array(N).fill(' '));  // 공백으로 초기화 -> 나중에 별만 찍으면됨

  /**
   * 별찍기 재귀 함수
   * @param {*} arr 2차원 결과 배열
   * @param {*} row 현재 처리할 정사각형의 시작 행
   * @param {*} col 현재 처리할 정사각형의 시작 행
   * @param {*} size 현재 처리할 정사각형의 크기
   * @returns 
   */
  const fillStars = (arr, row, col, size) => {
    // size가 1일때 별하나 찍기
    if (size === 1) {
      arr[row][col] = '*';
      return;
    }

    const newSize = size / 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // 가운데(1, 1)는 공백으로 남김
        if (i === 1 && j === 1) {
          continue;
        }

        // 작은 구역들의 시작 좌표 계산
        const newRow = row + i * newSize;
        const newCol = col + j * newSize;

        fillStars(arr, newRow, newCol, newSize)  // 재귀 호출
      }
    }
  }
  fillStars(array, 0, 0, N);

  return array.map(row => row.join('')).join('\n');  // 2차원 배열을 문자열로 변환
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));