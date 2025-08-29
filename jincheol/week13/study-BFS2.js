// 문제 링크: [4연산](https://www.acmicpc.net/problem/14395)

// 실행: node jincheol/week13/study-BFS2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week13/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} s 정수
 * @param {number} t 목표하는 수
 */
const solution = (s, t) => {
  if (s === t) return 0; // s와 t가 같은 경우 0 return

  /**
   *
   * @param {number} num 기존 계산값
   * @param {string} operator 연산자
   * @returns {number} 계산한 결과값
   */
  const calc = (num, operator) => {
    switch (operator) {
      case '+': // 덧셈
        return num + num;
      case '-': // 뺄셈
        return num - num;
      case '*': // 곱셈
        return num * num;
      case '/': // 나눗셈
        return num / num;
    }
  };

  const queue = [[s, '']]; // BFS를 위한 큐 [초기 숫자, 연산자]
  const operators = ['*', '+', '-', '/']; // 연산자들
  const MAX = 1_000_000_000; // 최댓값 (10^9)
  const calcHistory = new Set(); // 계산 기록
  calcHistory.add(s); // 첫 s 추가

  // BFS 시작
  while (queue.length) {
    const [curNum, operatorHistory] = queue.shift(); // 계산할 숫자와 연산자 기록

    // 연산자 순회
    for (let operator of operators) {
      // 현재 숫자가 0이 아닐 때만 / 를 사용할 수 있음
      if (operator === '/' && curNum === 0) continue;

      const result = calc(curNum, operator); // 계산
      // 계산 결과가 목표하는 숫자일 경우
      if (result === t) {
        const resultOperator = operatorHistory + operator; // 연산자를 추가하고 return
        return resultOperator;
      }

      // 계산 결과가 최댓값 초과이거나 계산 결과가 이미 계산한 경우일 때 continue (값은 값 반복이라)
      if (result > MAX || calcHistory.has(result)) continue;

      queue.push([result, operatorHistory + operator]); // 큐에 다음 숫자와 연산자 기록 추가
      calcHistory.add(result); // 계산 기록에 추가
    }
  }

  // 큐가 전부 비워졌음에도 여기까지 오면 바꿀 수 없는 경우라 -1 return
  return -1;
};

const [s, t] = input[0].split(' ').map(Number);
console.log(solution(s, t));
