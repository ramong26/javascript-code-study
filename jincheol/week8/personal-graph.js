// 문제 링크: [방의 개수](https://school.programmers.co.kr/learn/courses/30/lessons/49190)

// 원점(0,0)에서 시작해서 아래처럼 숫자가 적힌 방향으로 이동하며 선을 긋습니다.
// ex) 1일때는 오른쪽 위로 이동
// 그림을 그릴 때, 사방이 막히면 방하나로 샙니다.
// 이동하는 방향이 담긴 배열 arrows가 매개변수로 주어질 때, 방의 갯수를 return 하도록 solution 함수를 작성하세요.
// 제한사항
// 배열 arrows의 크기는 1 이상 100,000 이하 입니다.
// arrows의 원소는 0 이상 7 이하 입니다.
// 방은 다른 방으로 둘러 싸여질 수 있습니다.

// 실행: node jincheol/week8/personal-graph.js

function solution(arrows) {
  // 8방향 이동 벡터 (시계방향)
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [1, 1, 0, -1, -1, -1, 0, 1];

  // 방문한 점과 간선을 저장할 Set
  const visitedNodes = new Set();
  const visitedEdges = new Set();

  let x = 0;
  let y = 0;
  let rooms = 0;

  // 시작점 추가
  visitedNodes.add(`${x},${y}`);

  for (let arrow of arrows) {
    // 대각선 이동의 경우 교차점 처리를 위해 2단계로 분할
    for (let step = 0; step < 2; step++) {
      const nx = x + dx[arrow] * 0.5;
      const ny = y + dy[arrow] * 0.5;

      const currentNode = `${x},${y}`;
      const nextNode = `${nx},${ny}`;

      // 간선 키 생성 (양방향이므로 정렬)
      const edgeKey =
        currentNode < nextNode
          ? `${currentNode}-${nextNode}`
          : `${nextNode}-${currentNode}`;

      // 다음 점이 이미 방문했고, 간선이 새로운 경우 방 생성
      if (visitedNodes.has(nextNode) && !visitedEdges.has(edgeKey)) {
        rooms++;
      }

      // 현재 상태 업데이트
      visitedNodes.add(nextNode);
      visitedEdges.add(edgeKey);

      x = nx;
      y = ny;
    }
  }

  return rooms;
}

const ex_arrows = [6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0];

const ex_sol = solution(ex_arrows);
// 입출력 예시 결과값: 3
console.log(ex_sol);
