// 문제 링크: [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844)

// ROR 게임은 두 팀으로 나누어서 진행하며, 상대 팀 진영을 먼저 파괴하면 이기는 게임입니다.
// 따라서, 각 팀은 상대 팀 진영에 최대한 빨리 도착하는 것이 유리합니다.
// 게임 맵의 상태 maps가 매개변수로 주어질 때, 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 return 하도록 solution 함수를 완성해주세요.
// 단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.
// 제한사항
// maps는 n x m 크기의 게임 맵의 상태가 들어있는 2차원 배열로, n과 m은 각각 1 이상 100 이하의 자연수입니다.
// n과 m은 서로 같을 수도, 다를 수도 있지만, n과 m이 모두 1인 경우는 입력으로 주어지지 않습니다.
// maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
// 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며, 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.

// 실행: node jincheol/week6/study-DFS_BFS1.js

function solution(maps) {
  const xMax = maps[0].length;
  const yMax = maps.length;
  // [우, 좌, 상, 하] 순서
  // 이동 경로를 계산할 때 편하게 하기 위함
  const goX = [1, -1, 0, 0];
  const goY = [0, 0, 1, -1];

  // BFS를 위한 큐
  const visited = [[0, 0, 1]]; // 방문할 장소를 저장
  maps[0][0] = 0; // 시작 지점 방문처리, maps를 직접 변경하며 방문처리 할 예정

  // 방문할 장소가 있을 경우 순회
  while (visited.length) {
    const [y, x, count] = visited.shift(); // 방문할 장소를 꺼내오기

    // 우 -> 좌 -> 상 -> 하 순서로 순회
    for (let i = 0; i < 4; i++) {
      // 이동할 곳의 좌표 계산
      // eg. i가 0이면 x + goX[0] = x + 1, y + goY[0] = y + 0
      const nextX = x + goX[i];
      const nextY = y + goY[i];

      // 이동할 곳의 좌표가 도착점이면 count와 다음 이동 카운트 1 더해서 return
      if (nextX === xMax - 1 && nextY === yMax - 1) return count + 1;

      // 이동할 곳의 좌표가 맵 밖인지 확인
      const canX = nextX >= 0 && nextX < xMax; // x축으로 이동할 수 있는지
      const canY = nextY >= 0 && nextY < yMax; // y축으로 이동할 수 있는지

      // 이동할 곳이 맵 밖이 아니고, 방문했던 장소가 아닐 경우
      if (canX && canY && maps[nextY][nextX] === 1) {
        maps[nextY][nextX] = 0; // 다음 장소를 방문 처리
        visited.push([nextY, nextX, count + 1]); // 방문할 장소에 좌표와 카운트를 삽입
      }
    }
  }

  // whlie 문에서 카운트를 return하지 않으면 목표지점에 도달하지 못한 것이기 때문에 -1 return
  return -1;
}

const ex_maps_one = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];
const ex_maps_two = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1],
];

const ex_sol_one = solution(ex_maps_one);
const ex_sol_two = solution(ex_maps_two);
// 입출력 예시 결과값: 11, -1
console.log(ex_sol_one, ex_sol_two);
