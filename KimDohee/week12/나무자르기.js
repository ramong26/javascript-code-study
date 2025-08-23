// 이분탐색
// https://www.acmicpc.net/problem/2805
// 나무의 수 N, 나무의 길이 M

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);
  const trees = lines[1].split(' ').map(Number);

  /**
   * 절단기로 특정 높이로 잘랐을 때 얻을 수 있는 나무의 총 길이 계산 함수
   * @param {number[]} trees - 나무 높이 배열
   * @param {number} height - 절단기 높이
   * @returns {number} 얻을 수 있는 나무의 총 길이
   */
  function getTotal(trees, height) {
    let total = 0;
    for (let tree of trees) {
      if (tree > height) {
        total += tree - height;
      }
    }
    return total;
  }

  let left = 0;
  let right = Math.max(...trees);
  let answer = 0;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const total = getTotal(trees, mid);

    if (total >= M) {
      // M미터 이상 얻을 수 있는 경우
      answer = mid;  // 더 높은 높이 시도
      left = mid + 1;
    } else {
      right = mid - 1;  // 더 낮은 높이 시도
    }
  }

  return answer;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
