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
 * @param {number} N 카드 개수
 * @param {number[]} cards 카드에 적힌 정수들
 */
const solution = (N, cards) => {
  const cardMap = new Map(); // 카드를 저장할 Map
  for (const card of cards) {
    cardMap.set(card, (cardMap.get(card) || 0) + 1); // 카드와 개수 저장
  }

  let maxCount = 0; // 최대 개수
  let answer = Infinity; // 정답 숫자
  // Map 객체 순회
  for (const [number, count] of cardMap) {
    // 현재 카드의 개수가 maxCount보다 많으면
    if (maxCount < count) {
      answer = number; // 정답 숫자 갱신
      maxCount = count; // 최대 개수 갱신
      continue;
    }

    // 최대 개수와 현재 카드의 개수가 같을 경우는 작은 숫자가 정답
    if (maxCount === count && number < answer) {
      answer = number;
    }
  }

  return answer.toString(); // BigInt를 사용하면 뒤에 n이 붙이 때문에 문자열로 변환
};

const N = parseInt(input.shift());
// 문제의 정수는 |2^62|까지, Number는 |2^53-1| 까지 정확히 표현 가능
// Number로 형 변환 시 오류가 발생하기에 BigInt 사용
const cards = input.map((v) => BigInt(v.trim()));
console.log(solution(N, cards));
