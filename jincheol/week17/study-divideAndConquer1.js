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
  let minusOneCount = 0; // -1 개수
  let zeroCount = 0; // 0 개수
  let oneCount = 0; // 1 개수

  /**
   * 종이가 어떤 원소로 이루어져 있는지 분류하는 함수
   * @param {number[][]} paper 분류할 종이
   */
  const classificationPaper = (paper) => {
    const value = paper[0][0]; // 종이의 첫번째 원소
    // 이 함수는 호출 시점이 모든 원소가 동일한 경우기에 value에 따라 카운팅
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
    let first = paper[0][0]; // 첫번째 원소
    // 종이를 순회
    for (const row of paper) {
      for (const num of row) {
        // 첫번째 원소와 다른 원소가 있으면 false
        if (first !== num) return false;
      }
    }
    // 모든 원소를 순회했을 때 false를 return하지 않았으면 true
    return true;
  };

  /**
   * 종이를 확인하며 자르는 함수
   * @param {number[][]} paper
   */
  const checkPaper = (paper) => {
    const isSameNumbers = checkSameNumbers(paper); // 종이가 모두 같은 원소인지 확인
    if (isSameNumbers) {
      classificationPaper(paper); // 모두 같은 원소의 종이면 분류해서 카운팅
      return; // 종료
    }

    // 종이가 모두 같은 원소가 아닐 경우
    // row의 1/3씩 순회
    for (let r = 0; r < paper.length; r += paper.length / 3) {
      // col의 1/3씩 순회
      for (let c = 0; c < paper.length; c += paper.length / 3) {
        // 새로운 종이 생성 (row를 3분할 하고 col 3분할)
        const slicedPaper = paper
          .slice(r, r + paper.length / 3)
          .map((v) => v.slice(c, c + paper.length / 3));

        checkPaper(slicedPaper); // 재귀 호출
      }
    }
  };

  checkPaper(paper); // 종이 확인

  // 정답 문자열 생성
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
 * 개선한 함수 (직접 9분할 종이를 생성하지 않고 index로 접근)
 * @param {number} N
 * @param {number[][]} paper
 * @returns
 */
const solution2 = (N, paper) => {
  let minusOneCount = 0;
  let zeroCount = 0;
  let oneCount = 0;

  /**
   * 종이가 어떤 원소로 이루어져 있는지 분류하는 함수
   * @param {number} row 확인할 종이의 시작 row index
   * @param {number} col 확인할 종이의 시작 col index
   */
  const classificationPaper = (row, col) => {
    const value = paper[row][col];
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
   * @param {number} row 확인할 종이의 시작 row index
   * @param {number} col 확인할 종이의 시작 col index
   * @param {number} size 확인할 종이의 크기
   * @returns
   */
  const checkSameNumbers = (row, col, size) => {
    let first = paper[row][col]; // 종이의 첫번째 원소
    // 시작 row 또는 col부터 size만큼 순회
    for (let r = row; r < row + size; r++) {
      for (let c = col; c < col + size; c++) {
        // 첫번째 원소와 현재 원소가 다르면 false
        if (first !== paper[r][c]) return false;
      }
    }

    return true;
  };

  /**
   * 종이를 확인하며 자르는 함수
   * @param {number} row 종이의 시작 row index
   * @param {number} col 종이의 시작 col index
   * @param {number} size 종이의 크기
   * @returns
   */
  const checkPaper = (row, col, size) => {
    const isSameNumbers = checkSameNumbers(row, col, size);
    if (isSameNumbers) {
      classificationPaper(row, col);
      return;
    }

    const nextSize = size / 3; // 자를 종이의 크기
    // 3분할 이기 때문에 3 3 순회
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        // 재귀 호출 (현재 종이의 가로 또는 세로의 시작 index + 종이의 순서 * 종이의 크기)
        checkPaper(row + r * nextSize, col + c * nextSize, nextSize);
      }
    }
  };

  checkPaper(0, 0, N); // 종이 확인

  let answer = '';
  answer += minusOneCount.toString() + '\n';
  answer += zeroCount.toString() + '\n';
  answer += oneCount.toString();

  return answer;
};

// const N = parseInt(input.shift());
// const paper = input.map((v) => v.split(' ').map(Number));
// console.log(solution2(N, paper));
