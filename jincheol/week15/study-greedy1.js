// 문제 링크: [잃어버린 괄호](https://www.acmicpc.net/problem/1541)

// 실행: node jincheol/week15/study-greedy1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week15/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {string} fomula 수식
 */
const solution = (fomula) => {
  const fomulaWithoutMinus = fomula.split('-');
  let answer = 0;

  const firstSum = fomulaWithoutMinus
    .shift()
    .split('+')
    .reduce((acc, cur) => acc + Number(cur), 0);

  answer += firstSum;

  for (let i = 0; i < fomulaWithoutMinus.length; i++) {
    const curSum = fomulaWithoutMinus[i]
      .split('+')
      .reduce((acc, cur) => acc + Number(cur), 0);

    answer -= curSum;
  }

  return answer;
};

const fomula = input[0];
console.log(solution(fomula));
