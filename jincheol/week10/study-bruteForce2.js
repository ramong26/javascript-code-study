// 문제 링크: [부분수열의 합](https://www.acmicpc.net/problem/1182)

// 실행: node jincheol/week10/study-bruteForce2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week10/input2.txt')
  .toString()
  .trim()
  .split('\n');

const [N, S] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let count = 0;

/**
 *
 * @param {number} depth 현재 탐색 중인 배열의 인덱스
 * @param {number} sum 현재까지 탐색한 부분수열의 합
 * @returns
 */
const dfs = (depth, sum) => {
  // 끝까지 탐색했다면 종료
  if (depth === N) {
    // 현재까지의 합이 S와 같은지 확인
    if (sum === S) {
      count++; // 같으면 count++
    }
    return;
  }

  // 현재 원소를 포함하는 경우와 포함하지 않는 경우 모두 고려하며 합을 계산해야 함
  // 현재 원소를 포함하는 경우
  dfs(depth + 1, sum + arr[depth]);

  // 현재 원소를 포함하지 않는 경우
  dfs(depth + 1, sum);
};

// 0번째 인덱스, 합 0으로 시작
dfs(0, 0);

// 현재 예제에서 [-3, -2, 5]로 1개가 유효하지만 모든 원소를 선택하지 않은 경우도 포함되어 2가 출력이 됨
// 모든 원소를 선택하지 않아도 합을 0으로 시작하기 때문에 S가 0일 때 count가 증가함
// 이 예외 케이스를 제거하기 위해 1을 빼줌
if (S === 0) {
  count--;
}

console.log(count);
