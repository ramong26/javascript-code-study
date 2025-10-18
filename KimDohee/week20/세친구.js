/**
 * 브루트포스 - 세친구(https://www.acmicpc.net/problem/17089)
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);  // N: 사람 수, M: 관계 수
  const graph = Array.from({ length: N + 1 }, () => new Set());

  for (let i = 1; i <= M; i++) {
    const [A, B] = lines[i].split(' ').map(Number);
    graph[A].add(B);
    graph[B].add(A);
  }

  // 각 노드의 친구 수 미리 계산 
  const number = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    number[i] = graph[i].size;
  }

  let minSum = Infinity;
  let triangle = false;

  for (let a = 1; a <= N; a++) {
    for (const b of graph[a]) {
      if (b <= a) continue;  // 중복 방지
      // a와 b의 공통 친구 찾기
      for (const c of graph[a]) {
        if (c <= b) continue;  // 중복 방지
        if (!graph[b].has(c)) continue;

        // 친구 수 계산
        // 삼각형 발견
        triangle = true;

        // 각자의 친구 수에서 삼각형 2명씩 제외
        const sumNumber = (number[a] - 2) + (number[b] - 2) + (number[c] - 2);
        minSum = Math.min(minSum, sumNumber);
      }
    }
  }

  return triangle ? minSum : -1;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));