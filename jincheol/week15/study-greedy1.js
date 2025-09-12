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
 * 최솟값을 찾아야 하기에 큰 수를 빼야함 -> 첫 - 이후 값들을 괄호로 묶기
 * @param {string} fomula 수식
 */
const solution = (fomula) => {
  const fomulaWithoutMinus = fomula.split('-'); // -를 제외하기
  let answer = 0; // 정답

  // 첫번째 원소는 무조건 더해줘야 한다.
  // +가 있을 수도 있기에 split 후 더해주기
  const firstSum = fomulaWithoutMinus
    .shift()
    .split('+')
    .reduce((acc, cur) => acc + Number(cur), 0);

  answer += firstSum; // 정답에 더해주기

  // 첫번째 - 이후 값들을 괄호로 묶기
  for (let i = 0; i < fomulaWithoutMinus.length; i++) {
    // 이후 값에 +가 있을 수 있으니 split 후 더해주기
    const curSum = fomulaWithoutMinus[i]
      .split('+')
      .reduce((acc, cur) => acc + Number(cur), 0);

    answer -= curSum; // 정답에서 빼주기
  }

  return answer;
};

const fomula = input[0];
console.log(solution(fomula));
