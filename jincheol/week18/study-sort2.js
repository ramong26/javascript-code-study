// 문제 링크: [카드](https://www.acmicpc.net/problem/11652)

// 실행: node jincheol/week18/study-sort2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week18/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N
 * @param {number[]} cards
 */
const solution = (N, cards) => {
  const cardMap = new Map();
  for (const card of cards) {
    cardMap.set(card, (cardMap.get(card) || 0) + 1);
  }

  let maxCount = 0;
  let answer = Infinity;
  for (const [number, count] of cardMap) {
    if (maxCount < count) {
      answer = number;
      maxCount = count;
      continue;
    }

    if (maxCount === count && number < answer) {
      answer = number;
    }
  }

  return answer.toString();
};

const N = parseInt(input.shift());
const cards = input.map((v) => BigInt(v.trim()));
console.log(solution(N, cards));
