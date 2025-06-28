function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  // 상하좌우 방향 정의
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // 방문 체크 배열
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[0][0] = true;

  // BFS 큐: [x, y, 거리]
  const queue = [[0, 0, 1]];

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    // 도착했을 경우 거리 반환
    if (x === n - 1 && y === m - 1) {
      return dist;
    }

    // 4방향 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 맵 범위 내에 있고, 방문 안 했고, 길이 있을 경우
      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < m &&
        !visited[nx][ny] &&
        maps[nx][ny] === 1
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  // 도착 불가능할 경우
  return -1;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
);
