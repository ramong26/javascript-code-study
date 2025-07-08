// 문제 링크: [가장 먼 노드](https://school.programmers.co.kr/learn/courses/30/lessons/49189)

// n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다.
// 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다.
// 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.
// 노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때,
// 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 노드의 개수 n은 2 이상 20,000 이하입니다.
// 간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
// vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.

// 실행: node jincheol/week8/study-graph1.js
function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []); // 각 노드들의 연결 구성 저장
  for (const [from, to] of edge) {
    // 양방향 그래프이므로 from, to 둘 다 추가
    graph[from].push(to);
    graph[to].push(from);
  }

  // 방문 기록과 거리를 저장
  const history = Array.from({ length: n + 1 }, () => ({
    distance: -1,
    visited: false,
  }));

  // BFS를 위한 큐, [현재 노드, 현재 노드까지 거리]
  const queue = [[1, 0]];
  // 시작 노드 초기화
  history[1].distance = 0;
  history[1].visited = true;

  let front = 0; // shift()를 사용하지 않고 index를 가르키는 변수로 사용
  let maxDistance = 0; // 탐색 중 가장 먼 거리 저장

  // 탐색 시작
  while (front < queue.length) {
    const [curNode, curDistance] = queue[front]; // 큐에서 추출
    front++; // 다음 큐를 요소를 위해 ++

    // 현재 노드까지 거리가 maxDistance보다 크면 maxDistance 값을 변경
    if (curNode > maxDistance) maxDistance = curDistance;

    // 현재 노드와 연결된 노드들 탐색
    for (const neighbor of graph[curNode]) {
      // 현재 노드와 연결된 노드가 방문하지 않은 노드라면
      if (history[neighbor].visited === false) {
        // 방문 처리 및 거리 계산
        history[neighbor].visited = true;
        history[neighbor].distance = curDistance + 1;
        // 연결된 노드를 큐에 추가
        queue.push([neighbor, curDistance + 1]);
      }
    }
  }

  let answer = 0; // 가장 먼 노드의 개수
  // 방문 기록을 순회하면서 maxDistance와 같은 거리에 있는 노드의 수를 카운팅
  for (let i = 1; i <= n; i++) {
    if (history[i].distance === maxDistance) answer++;
  }

  return answer;
}

const ex_n = 6;
const ex_vertex = [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
];

const ex_sol = solution(ex_n, ex_vertex);
// 입출력 예시 결과값: 3
console.log(ex_sol);
