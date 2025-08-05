// 문제 링크: [부분수열의 합2](https://www.acmicpc.net/problem/14225)

// 실행: node jincheol/week10/personal-bruteForce.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week10/input3.txt')
  .toString()
  .trim()
  .split('\n');

const S = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);

// 개선된 풀이 (gemini 피셜)
const sums = new Set();

/**
 *
 * @param {number} depth 현재 탐색 중인 배열의 인덱스
 * @param {number} sum 현재까지 탐색한 부분수열의 합
 * @returns
 */
const dfs = (depth, sum) => {
  // 모든 원소를 순회했을 때
  if (depth === S) {
    // 모든 원소를 포함하지 않는 경우를 제외하고
    if (sum !== 0) {
      // 합 추가
      sums.add(sum);
    }
    return;
  }

  // 현재 원소를 합에 포함하는 경우
  dfs(depth + 1, sum + numbers[depth]);

  // 현재 원소를 합에 포함하지 않는 경우
  dfs(depth + 1, sum);
};

dfs(0, 0);

// 부분 수열의 합으로 나올 수 없는 가장 작은 자연수 찾기
let answer = 1;
while (sums.has(answer)) {
  answer++;
}
console.log(answer);

// 기존 풀이
// 최대 합을 구하고 해당 수까지의 모든 자연수를 불린 값으로 초기화
const maxSum = numbers.reduce((acc, cur) => (acc += cur), 0);
const allNumber = Array.from({ length: maxSum }, () => false);

/**
 *
 * @param {number} depth 현재 탐색 중인 배열의 인덱스
 * @param {number} sum 현재까지 탐색한 부분수열의 합
 * @returns
 */
const dfs2 = (depth, sum) => {
  // 모든 원소를 순회했을 때
  if (depth === S) {
    // 모든 원소를 포함하지 않는 경우를 제외하고
    if (sum !== 0) {
      // 합에 해당하는 index를 true로 변경
      allNumber[sum - 1] = true;
    }
    return;
  }

  // 현재 원소를 합에 포함하는 경우
  dfs(depth + 1, sum + numbers[depth]);

  // 현재 원소를 합에 포함하지 않는 경우
  dfs(depth + 1, sum);
};

// dfs(0, 0);

// false인 (합을 만들 수 없는 자연수) 인덱스를 찾고
const minNumIndex = allNumber.findIndex((val) => val === false);
// 찾지 못했을 때 (모든 합을 만들 수 있는 경우)
if (minNumIndex === -1) {
  console.log(maxSum + 1); // 최대값 + 1
} else {
  console.log(minNumIndex + 1); // index값 + 1
}

// 실제 백준에 제출했을 때 기존 풀이가 효율성이 좋았고 이에 대한 gemini의 분석
// 메모리 20336KB -> 31024KB
// 시간 256ms -> 312ms

// 이러한 현상이 발생한 이유는 JavaScript 엔진과 Set 자료구조의 내부 구현, 그리고 문제의 특성 때문일 수 있습니다.

// 1. Set 자료구조의 메모리 오버헤드
// Set은 해시 테이블 기반으로 구현되어 있습니다. 각 요소를 저장하기 위해 값뿐만 아니라 해시 충돌을 처리하기 위한 추가적인 포인터나 링크 정보 등을 저장해야 합니다.
// allNumber 배열의 경우, 메모리가 미리 할당되고 false 또는 true라는 간단한 불리언 값만 저장합니다.
// Set의 경우, 각 숫자(sum)를 객체 형태로 저장하고 해시 테이블의 각 버킷에 연결합니다. 따라서 allNumber 배열에 불리언 값만 저장하는 것보다 개별 숫자를 저장하는 데 더 많은 메모리가 소모될 수 있습니다.
// 문제의 maxSum은 최대 2,000,000까지 될 수 있습니다.
// allNumber 배열: 2,000,000×1 바이트(불리언 값) ≈2 MB (대략적인 계산)
// Set: 2,000,000개의 숫자를 저장할 때, 각 숫자마다 해시 테이블 오버헤드가 발생하여 훨씬 더 많은 메모리를 사용하게 됩니다.
// 결과적으로, maxSum이 작을 때는 Set이 효율적일 수 있지만, 이 문제처럼 maxSum이 매우 클 때는 allNumber 배열을 사용하는 것이 메모리 측면에서 유리할 수 있습니다.

// 2. JavaScript 엔진의 최적화
// Node.js의 V8 엔진은 Array에 대해 매우 강력한 최적화가 적용되어 있습니다. 특히, 불리언 값으로만 채워진 배열은 메모리 사용량이 매우 효율적일 수 있습니다.
// 반면, Set은 동적으로 크기가 확장되고 내부적으로 해시 충돌을 해결하는 과정이 포함되므로, 미리 크기가 정해진 Array보다 더 많은 연산과 메모리를 사용할 수 있습니다.

// 3. while 루프의 오버헤드
// 개선 코드: while(sums.has(answer)) 루프는 answer가 1부터 maxSum까지 커질 때, sums에 해당 값이 존재하는지 매번 해시 연산을 통해 확인해야 합니다.
// 이전 코드: findIndex는 배열을 순회하며 false인 값을 한 번만 찾습니다. 이 과정은 연속된 메모리 공간을 빠르게 순회하므로 더 효율적일 수 있습니다.
