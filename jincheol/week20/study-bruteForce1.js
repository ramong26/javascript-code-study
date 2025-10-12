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
  // 친구 관계 저장
  const relationshipArr = Array.from({ length: N }, () => new Set());
  for (const [a, b] of relationships) {
    relationshipArr[a - 1].add(b);
    relationshipArr[b - 1].add(a);
  }

  let answer = Infinity; // 정답

  // N명의 사람 중 3명을 선택하는 경우 모두 순회
  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      const aRelation = relationshipArr[i];
      // 3중 for문은 시간 초과 발생 => 2명이 친구가 아닌 경우는 탐색 x
      if (!aRelation.has(j + 1)) continue;

      const bRelation = relationshipArr[j];
      // 다른 한명 탐색
      for (let k = j + 1; k < N; k++) {
        const cRelation = relationshipArr[k];
        // 3명 모두 친구일 경우
        if (aRelation.has(k + 1) && bRelation.has(k + 1)) {
          // 각 사람들의 친구의 수
          let aCount = aRelation.size;
          let bCount = bRelation.size;
          let cCount = cRelation.size;

          const sum = aCount + bCount + cCount - 6; // 서로 모두 친구라 2 * 3을 뺌
          answer = Math.min(answer, sum); // 정답 갱신
        }
      }
    }
  }

  return answer === Infinity ? -1 : answer;
};

const [N, M] = input.shift().split(' ').map(Number);
const relationships = input.map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, M, relationships));
