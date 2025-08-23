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
  if (s === t) return 0;

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

  const queue = [[s, '']];
  const operators = ['*', '+', '-', '/'];
  const MAX = 1_000_000_000;
  const calcHistory = new Set();
  calcHistory.add(s);

  while (queue.length) {
    const [curNum, operatorHistory] = queue.shift();

    for (let operator of operators) {
      if (operator === '/' && curNum === 0) continue;

      const result = calc(curNum, operator);
      if (result === t) {
        const resultOperator = operatorHistory + operator;
        return resultOperator;
      }

      if (result > MAX || calcHistory.has(result)) continue;

      queue.push([result, operatorHistory + operator]);
      calcHistory.add(result);
    }
  }

  return -1;
};

const [s, t] = input[0].split(' ').map(Number);
console.log(solution(s, t));
