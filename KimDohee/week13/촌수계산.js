/**
 * BFS - 촌수계산 (https://www.acmicpc.net/problem/2644)
 * 촌수 단위를 사용하여 여러 사람들에 대한 부모 자식들 간의 관계가 주어졌을 때, 주어진 두 사람의 촌수를 계산
 * 예제입력
9   : 전체 사람의 수 n
7 3 : 계산해야하는 두 사람의 번호
7   : 부모자식들 간의 관계의 개수 m
1 2 : 부모 자식 간의 관계를 나타내는 두 번호 x, y
1 3
2 7
2 8
2 9
4 5
4 6
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);
  const [person1, person2] = lines[1].split(' ').map(Number);
  const m = parseInt(lines[2]);

  // 그래프 초기화 (인접 리스트)
  const graph = Array.from({length: n + 1}, () => []);

  // 관계 저장
  for (let i = 0; i < m; i++) {
    const [parent, child] = lines[i + 3].split(' ').map(Number);
    graph[parent].push(child);  // 부모 자식간 양방향 연결
    graph[child].push(parent);
  }

  // BFS로 촌수(최단 거리) 계산
  const queue = [person1];  // 시작점
  const visited = new Array(n + 1).fill(false);  // 방문 체크
  const distance = new Array(n + 1).fill(-1)  // 촌수(거리) 배열

  visited[person1] = true;
  distance[person1] = 0;

  while (queue.length > 0) {
    const current = queue.shift();

    // 목표 사람을 찾았으면 촌수 반환
    if (current === person2) {
      return distance[current];
    }

    // 인접한 사람들 탐색
    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = true;
        distance[next] = distance[current] + 1;
        queue.push(next);
      }
    }
  }

  return -1;  // 연결되지 않은 경우
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
