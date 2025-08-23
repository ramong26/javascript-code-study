// 문제 링크: [랜선 자르기](https://www.acmicpc.net/problem/1654)

// 실행: node jincheol/week12/study-binarySearch1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week12/input1.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} K 랜선의 개수
 * @param {number} N 만들어야하는 최소 랜선 개수
 * @param {number[]} lines 갖고 있는 랜선의 길이
 */
const solution = (K, N, lines) => {
  let answer = 0; // 최종 답
  let min = 1; // 최소 랜선 길이
  let max = Math.max(...lines); // 최대 랜선 길이

  // 이분 탐색을 위한 루프
  while (min <= max) {
    let mid = Math.floor((min + max) / 2); // 중간 길이
    let count = 0; //  mid 길이의 랜선 개수

    // 랜선 순회
    for (let line of lines) {
      // 랜선을 mid 길이로 잘랐을 때 가능한 개수를 count에 더함
      count += Math.floor(line / mid);
      if (count >= N) break; // mid 길이의 랜선의 개수가 N개 이상이면 종료 (더 자르지 않아도 된다)
    }

    // mid 길이의 랜선의 개수가 N개 이상일 경우 (조건 통과)
    if (count >= N) {
      answer = mid; // 현재 mid 길이는 가능한 경우라 answer에 할당
      min = mid + 1; // 더 큰 mid 값을 찾기 위해 min 증가
    } else {
      // mid 길이의 랜선의 개수가 N가 미만일 경우 (조건 불통)
      max = mid - 1; // mid 길기 때문에 max 값을 줄여서 mid 길이 줄이기
    }
  }

  return answer;
};

const [K, N] = input.shift().split(' ').map(Number);
const lines = input.map(Number);
console.log(solution(K, N, lines));
