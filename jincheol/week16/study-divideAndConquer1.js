// 문제 링크: [숫자 카드](https://www.acmicpc.net/problem/10815)

// 실행: node jincheol/week16/study-divideAndConquer1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week16/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 상근이가 갖고 있는 숫자 카드의 개수
 * @param {number[]} cards 숫자 카드에 적혀있는 정수
 * @param {number} M 구별해야 할 정수의 개수
 * @param {number[]} numbers 구별해야 할 정수
 */
const solution = (N, cards, M, numbers) => {
  const cardSet = new Set(cards); // 갖고 있는 카드들을 Set에 저장
  const answer = []; // 소유 여부를 저장할 배열 (0과 1)

  // 구별할 정수들을 순회
  for (let num of numbers) {
    const hasNum = cardSet.has(num); // 갖고 있는지 확인
    if (hasNum) answer.push(1); // 갖고 있으면 1
    else answer.push(0); // 없으면 0
  }

  // 문자열로 공백을 추가하여 return
  return answer.join(' ');
};

const N = parseInt(input.shift());
const cards = input.shift().split(' ').map(Number);
const M = parseInt(input.shift());
const numbers = input.shift().split(' ').map(Number);
console.log(solution(N, cards, M, numbers));
