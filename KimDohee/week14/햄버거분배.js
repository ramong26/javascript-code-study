/**
 * 그리디 알고리즘 - 햄버거 분배 문제 (https://www.acmicpc.net/problem/19941)
 * 
 * 일렬로 배치된 사람(P)과 햄버거(H)에서, 각 사람은 자신의 위치에서 K 거리 이하에 있는 햄버거만 먹을 수 있다.
 * 햄버거를 먹을 수 있는 사람의 최대 수를 구하기
 * 
 * @type {number} N - 식탁의 길이 (1 ≤ N ≤ 20,000)
 * @type {number} K - 햄버거를 선택할 수 있는 거리 (1 ≤ K ≤ 10)
 * @type {string[]} table - 사람(P)과 햄버거(H)의 위치
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, K] = lines[0].split(' ').map(Number);
  const table = lines[1].split('');

  const visited = new Array(N).fill(false);  // 이미 먹은 햄버거
  let count = 0;  // 햄버거를 먹은 사람 수

  // 왼쪽부터 사람을 발견하여 범위 내에서 가장 왼쪽 햄벅거를 선택 
  for (let i = 0; i < N; i++) {
    // 사람을 발견했을 때 처리
    if (table[i] === 'P') {
      // 이 사람이 먹을 수 있는 범위: [i-K, i+K]
      const start = Math.max(0, i - K);
      const end = Math.min(N-1, i + K);

      // 범위 내에서 가장 왼쪽에 있는 아직 먹지 않은 햄버거 찾기
      for (let j = start; j <= end; j++) {
        if (table[j] === 'H' && !visited[j]) {
          visited[j] = true;   // 햄버거 먹음 표시
          count++;   // 먹은 사람 수 증가
          break;     // 한 개만 먹으면 되므로 break
        }
      }
    }
  }

  return count;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
