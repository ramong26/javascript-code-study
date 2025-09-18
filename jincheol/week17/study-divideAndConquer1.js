// 문제 링크: [종이의 개수](https://www.acmicpc.net/problem/1780)

// 실행: node jincheol/week17/study-divideAndConquer1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week17/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 종이의 한 변의 크기
 * @param {number[][]} paper 종이의 구성
 */
const solution = (N, paper) => {
  let minusOneCount = 0;
  let zeroCount = 0;
  let oneCount = 0;

  /**
   * 종이가 어떤 원소로 이루어져 있는지 분류하는 함수
   * @param {number[][]} paper 분류할 종이
   */
  const classificationPaper = (paper) => {
    const value = paper[0][0];
    switch (value) {
      case -1:
        minusOneCount++;
        break;
      case 0:
        zeroCount++;
        break;
      case 1:
        oneCount++;
        break;
    }
  };

  /**
   * 모든 종이의 원소가 같은 수로 이루어져 있는지 확인하는 함수
   * @param {number[][]} paper 확인할 종이
   * @returns {boolean}
   */
  const checkSameNumbers = (paper) => {
    let first = paper[0][0];
    for (const row of paper) {
      for (const num of row) {
        if (first !== num) return false;
      }
    }

    return true;
  };

  /**
   * 종이를 확인하며 자르는 함수
   * @param {number[][]} paper
   */
  const checkPaper = (paper) => {
    const isSameNumbers = checkSameNumbers(paper);
    if (isSameNumbers) {
      classificationPaper(paper);
      return;
    }

    for (let r = 0; r < paper.length; r += paper.length / 3) {
      for (let c = 0; c < paper.length; c += paper.length / 3) {
        const slicedPaper = paper
          .slice(r, r + paper.length / 3)
          .map((v) => v.slice(c, c + paper.length / 3));

        checkPaper(slicedPaper);
      }
    }
  };

  checkPaper(paper);

  let answer = '';
  answer += minusOneCount.toString() + '\n';
  answer += zeroCount.toString() + '\n';
  answer += oneCount.toString();

  return answer;
};

const N = parseInt(input.shift());
const paper = input.map((v) => v.split(' ').map(Number));
console.log(solution(N, paper));

/**
 *
 * @param {number} N
 * @param {number[][]} paper
 * @returns
 */
// const solution2 = (N, paper) => {
//   let minusOneCount = 0;
//   let zeroCount = 0;
//   let oneCount = 0;

//   /**
//    * 종이가 어떤 원소로 이루어져 있는지 분류하는 함수
//    * @param {number} row 확인할 종이의 시작 row index
//    * @param {number} col 확인할 종이의 시작 col index
//    */
//   const classificationPaper = (row, col) => {
//     const value = paper[row][col];
//     switch (value) {
//       case -1:
//         minusOneCount++;
//         break;
//       case 0:
//         zeroCount++;
//         break;
//       case 1:
//         oneCount++;
//         break;
//     }
//   };

//   /**
//    * 모든 종이의 원소가 같은 수로 이루어져 있는지 확인하는 함수
//    * @param {number} row 확인할 종이의 시작 row index
//    * @param {number} col 확인할 종이의 시작 col index
//    * @param {number} size 확인할 종이의 크기
//    * @returns
//    */
//   const checkSameNumbers = (row, col, size) => {
//     let first = paper[row][col];
//     for (let r = row; r < row + size; r++) {
//       for (let c = col; c < col + size; c++) {
//         if (first !== paper[r][c]) return false;
//       }
//     }

//     return true;
//   };

//   /**
//    * 종이를 확인하며 자르는 함수
//    * @param {number} row 종이의 시작 row index
//    * @param {number} col 종이의 시작 col index
//    * @param {number} size 종이의 크기
//    * @returns
//    */
//   const checkPaper = (row, col, size) => {
//     const isSameNumbers = checkSameNumbers(row, col, size);
//     if (isSameNumbers) {
//       classificationPaper(row, col);
//       return;
//     }

//     const nextSize = size / 3;
//     for (let r = 0; r < 3; r++) {
//       for (let c = 0; c < 3; c++) {
//         checkPaper(row + r * nextSize, col + c * nextSize, nextSize);
//       }
//     }
//   };

//   checkPaper(0, 0, N);

//   let answer = '';
//   answer += minusOneCount.toString() + '\n';
//   answer += zeroCount.toString() + '\n';
//   answer += oneCount.toString();

//   return answer;
// };

// const N = parseInt(input.shift());
// const paper = input.map((v) => v.split(' ').map(Number));
// console.log(solution2(N, paper));
