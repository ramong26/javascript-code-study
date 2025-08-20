/** 에너지 모으기
 * https://www.acmicpc.net/problem/16198
 * N개의 구슬이 일렬로 놓여져 있을 때 첫번째와 마지막 구슬을 제외한 구슬 중 x번째 구슬을 제거해서 모을 수 있는 에너지의 최댓값 
 */

function solution(input) {
  const N = input.trim().split('\n')[0];
  const weights = input.trim().split('\n')[1].split(' ').map(Number);  // 구슬 무게 배열

  function dfs(weights) {
    // 종료조건 - 구슬이 2개 남았을 때
    if (weights.length === 2) return 0;

    let max = 0;

    // 첫번째와 마지막을 제외한 모든 구슬 시도
    for (let i = 1; i < weights.length - 1; i++) {
      // 에너지 계산
      const energy = weights[i-1] * weights[i+1];

      // 백트래킹 - 배열 복사후 구슬 제거
      const newWeights = [...weights];
      newWeights.splice(i, 1);  // 현재 구슬 제거

      // 최댓값 갱신 (현재 에너지 + 남은 에너지)
      max = Math.max(max, energy + dfs(newWeights));
    }

    return max;
  }

  return dfs(weights);
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
