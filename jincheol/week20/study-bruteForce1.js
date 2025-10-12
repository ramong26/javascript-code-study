// 문제 링크: [세 친구](https://www.acmicpc.net/problem/17089)

// 실행: node jincheol/week20/study-bruteForce1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week20/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 사람의 수
 * @param {number} M 친구 관계의 수
 * @param {[number, number][]} relationships 친구 관계
 */
const solution = (N, M, relationships) => {
  const relationshipArr = Array.from({ length: N }, () => new Set());
  for (const [a, b] of relationships) {
    relationshipArr[a - 1].add(b);
    relationshipArr[b - 1].add(a);
  }

  let answer = Infinity;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      const aRelation = relationshipArr[i];
      if (!aRelation.has(j + 1)) continue;

      const bRelation = relationshipArr[j];
      for (let k = j + 1; k < N; k++) {
        const cRelation = relationshipArr[k];
        if (aRelation.has(k + 1) && bRelation.has(k + 1)) {
          let aCount = aRelation.size;
          let bCount = bRelation.size;
          let cCount = cRelation.size;

          const sum = aCount + bCount + cCount - 6;
          answer = Math.min(answer, sum);
        }
      }
    }
  }

  return answer === Infinity ? -1 : answer;
};

const [N, M] = input.shift().split(' ').map(Number);
const relationships = input.map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, relationships));
