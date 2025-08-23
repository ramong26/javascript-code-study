// 문제 링크: [나무 자르기](https://www.acmicpc.net/problem/2805)

// 실행: node jincheol/week12/study-binarySearch2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week12/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 나무의 개수
 * @param {number} M 집으로 가져가려고 하는 나무의 길이
 * @param {number[]} trees 나무들의 높이
 */
const solution = (N, M, trees) => {
  let answer = 0; // 최종 절단기의 높이
  let min = 1; // 최소 절단기의 높이
  let max = Math.max(...trees); // 최대 절단기의 높이

  // 이분 탐색을 위한 루프
  while (min <= max) {
    let mid = Math.floor((min + max) / 2); // 중간 높이
    let totalTreeLen = 0; // 상근이가 집에 갖고가게 될 나무들의 길이 합

    // 나무들 순회
    for (let tree of trees) {
      // 나무를 mid 높이의 절단기로 잘랐을 때 집에 가져가는 나무의 길이를 더함
      // 나무가 mid 높이보다 작을 경우는 0을 더함
      totalTreeLen += tree - mid > 0 ? tree - mid : 0;
      if (totalTreeLen >= M) break; // totalTreeLen이 목표하는 나무 길이 이상이면 종료
    }

    // mid 높이의 절단기로 벌목했을 경우 목표하는 나무의 길이를 가져갈 수 있을 때 (조건 통과)
    if (totalTreeLen >= M) {
      answer = mid; // 현재 mid 높이는 가능한 경우라 answer에 할당
      min = mid + 1; // 더 큰 mid 값을 찾기 위해 min 증가 (절단기 높이의 최댓값을 찾기 위함)
    } else {
      // 목표하는 나무의 길이를 가져갈 수 없을 때 (조건 불통)
      max = mid - 1; // 현재 mid 높이를 줄이기 위해 max 값을 줄임
    }
  }

  return answer;
};

const [N, M] = input[0].split(' ').map(Number);
const trees = input[1].split(' ').map(Number);

console.log(solution(N, M, trees));
