// 문제 링크: [섬 연결하기](https://school.programmers.co.kr/learn/courses/30/lessons/42861?language=javascript)

// n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때,
// 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.
// 다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다.
// 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.
// 제한사항
// 섬의 개수 n은 1 이상 100 이하입니다.
// costs의 길이는 ((n-1) * n) / 2이하입니다.
// 임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
// 같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
// 모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
// 연결할 수 없는 섬은 주어지지 않습니다.

// 실행: node jincheol/week4/study-greedy2.js

function solution(n, costs) {
  let answer = 0;
  // 가장 비용이 적은 다리부터 건설하기 위해 오름차순으로 정렬
  const ascendingCosts = costs.sort((a, b) => a[2] - b[2]);
  // islandGroup은 서로 연결된 섬들의 묶음, 원소는 묶음의 대표(부모) 섬 번호
  // 처음에는 n개의 묶음(하나의 섬)이 존재하고 부모 섬은 자기 자신이다(index);
  const islandGroup = Array.from({ length: n }, (_, i) => i);

  // islandId(섬의 ID)가 속한 연결된 선의 그룹에서 부모 섬을 찾아 반환하는 함수
  const getParentIsland = (islandId) => {
    // 그룹의 부모가 자기 자신이면 자신 ID return
    if (islandGroup[islandId] === islandId) return islandId;

    // 해당 그룹의 최종 부모 섬을 찾기 위해 재귀
    // 최종 부모 섬을 재할당을 통해 이후 탐색 시간 단축
    islandGroup[islandId] = getParentIsland(islandGroup[islandId]);
    return islandGroup[islandId];
  };

  // 두 그룹(연결된 섬들의 묶음)을 합치는 함수 -> 다리를 이음
  const joinGroup = (from, to) => {
    // 각 그룹의 대표 섬을 찾음
    const parentFrom = getParentIsland(from);
    const parentTo = getParentIsland(to);
    // 각 그룹의 대표가 다르면 이어지지 않은 상태
    if (parentFrom !== parentTo) {
      islandGroup[parentTo] = parentFrom; // parentTo가 속한 그룹의 섬을 잇고 대표를 설정 parentFrom로 설정
      return true;
    }
    return false; // 각 그룹의 대표가 같으면 이어진 상태라 false
  };

  let connectedBridge = 0; // 연결한 다리 카운트

  // 정렬된 costs를 순회하면서
  for (let [from, to, cost] of ascendingCosts) {
    // from, to를 연결
    if (joinGroup(from, to)) {
      // 연결 성공 시 cost를 더해주고 카운트 ++
      answer += cost;
      connectedBridge++;

      // 모든 섬을 연결하는 최소의 다리 수는 n - 1, 연결한 다리 카운트가 n - 1이 되면 break
      if (connectedBridge === n - 1) break;
    }
  }

  return answer;
}

const ex_n = 4;

const ex_costs = [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
];

const ex_sol = solution(ex_n, ex_costs);
// 입출력 예시 결과값: 4
console.log(ex_sol);
