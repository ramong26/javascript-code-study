// BFS - 뱀과 사다리 게임 (https://www.acmicpc.net/problem/16928)
// 

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);

  // 사다리와 뱀 정보를 저장하기 위한 Map
  const map = new Map();

  // 사다리 정보 저장
  for (let i = 1; i <= N; i++) {
    const [x, y] = lines[i].split(' ').map(Number);
    map.set(x, y);
  }

  // 뱀 정보 저장
  for (let i = N + 1; i <= N + M; i++) {
    const [u, v] = lines[i].split(' ').map(Number);
    map.set(u, v);
  }

  // BFS
  // BFS를 위한 queue와 방문 체크용 visited 배열
  const queue = [];
  const visited = new Array(101).fill(false);

  // 시작점 (1번칸, 주사위 횟수 0)
  queue.push([1, 0]);
  visited[1] = true;

  while (queue.length > 0) {
    const [position, diceCount] = queue.shift();

    // 100에 도달했을 때
    if (position === 100) {
      return diceCount;
    }

    // 주사위 굴리기 1~6
    for (let dice = 1; dice <= 6; dice++) {
      let nextPosition = position + dice;

      if (nextPosition > 100) {
        continue;  //
      }

      if (map.has(nextPosition)) {
        nextPosition = map.get(nextPosition);
      }

      // 방문 체크
      if (!visited[nextPosition]) {
        visited[nextPosition] = true;
        queue.push([nextPosition, diceCount + 1]);
      }
    }
  }
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
