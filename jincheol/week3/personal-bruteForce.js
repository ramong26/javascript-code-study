// 문제 링크: [전력망을 둘로 나누기](https://school.programmers.co.kr/learn/courses/30/lessons/86971)

// 문제 설명
// n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있습니다.
// 당신은 이 전선들 중 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하려고 합니다.
// 이때, 두 전력망이 갖게 되는 송전탑의 개수를 최대한 비슷하게 맞추고자 합니다.
// 송전탑의 개수 n, 그리고 전선 정보 wires가 매개변수로 주어집니다.
// 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 나누었을 때,
// 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return 하도록 solution 함수를 완성해주세요.
// 제한사항
// n은 2 이상 100 이하인 자연수입니다.
// wires는 길이가 n-1인 정수형 2차원 배열입니다.
// wires의 각 원소는 [v1, v2] 2개의 자연수로 이루어져 있으며, 이는 전력망의 v1번 송전탑과 v2번 송전탑이 전선으로 연결되어 있다는 것을 의미합니다.
// 1 ≤ v1 < v2 ≤ n 입니다.
// 전력망 네트워크가 하나의 트리 형태가 아닌 경우는 입력으로 주어지지 않습니다

// 실행: node jincheol/week3/personal-bruteForce.js

// bfs를 사용
function solution(n, wires) {
  let answer = 100; // 두 송전탑의 개수의 차는 100을 넘을 수 없음
  const nodes = {}; // 각 송전탑들이 연결된 것을 객체형으로

  // nodes 초기화 및 연결된 노드들 추가
  wires.forEach(([v1, v2]) => {
    if (!nodes[v1]) nodes[v1] = [];
    if (!nodes[v2]) nodes[v2] = [];

    nodes[v1].push(v2);
    nodes[v2].push(v1);
  });

  // wires 중 하나를 끊은 뒤 연결되는 송전탑들을 연결하여 개수를 리턴하는 함수
  const connection = (start, excluded) => {
    let count = 0; // 연결한 송전탑 개수
    const ways = [start]; // start부터 연결되어있는 송전탑(전선)들, 처음 송전탑은 start
    const visited = []; // 방문한 송전탑

    // 연결된 송전탑(전선)이 있으면 계속 카운팅해야함
    while (ways.length) {
      const current = ways.shift(); // 연결된 송전탑을 꺼냄
      if (visited[current]) continue; // 방문한 송전탑이면 continue

      visited[current] = true; // 방문한 송전탑 마킹
      count++; // 연결한 송전탑 개수 ++

      // 현재 송전탑과 연결된 송전탑들은 순회
      nodes[current].forEach((point) => {
        // 연결된 송전탑이 방문한 송전탑이 아니고, 제거한 송전탑이 아니면 연결된 송전탑에 push
        if (!visited[point] && point !== excluded) ways.push(point);
      });
    }
    // 연결된 송전탑 개수 return
    return count;
  };

  // wire를 순회
  wires.forEach(([v1, v2]) => {
    // v1, v2를 모두 끊어보고 그 차이의 절댓값을 계산
    const gap = Math.abs(connection(v1, v2) - connection(v2, v1));
    // answer에 기존 gap과 현재 gap 중 최솟값을 할당
    answer = Math.min(answer, gap);
  });

  return answer;
}

const ex_n_one = 9;
const ex_n_two = 4;
const ex_n_three = 7;

const ex_wires_one = [
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [7, 8],
  [7, 9],
];
const ex_wires_two = [
  [1, 2],
  [2, 3],
  [3, 4],
];
const ex_wires_three = [
  [1, 2],
  [2, 7],
  [3, 7],
  [3, 4],
  [4, 5],
  [6, 7],
];

const ex_sol_one = solution(ex_n_one, ex_wires_one);
const ex_sol_two = solution(ex_n_two, ex_wires_two);
const ex_sol_three = solution(ex_n_three, ex_wires_three);
// 입출력 예시 결과값: 3, 0, 1
console.log(ex_sol_one, ex_sol_two, ex_sol_three);

// 다른 방법
function solution2(n, wires) {
  let answer = 98; // 차이의 최댓값은 98임 (99 - 1)
  const treeMap = new Map(); // Map을 사용하여 연결된 송전탑들 저장

  // index의 0번이 아닌 1번째 송전탑부터 있기에 1부터 Map 초기화
  for (let i = 1; i <= n; i++) treeMap.set(i, []);
  // wires를 순회하면서 treeMap에 모든 송전탑들을 key로 추가하고 연결된 송전탑을 value[]로 추가
  wires.forEach(([v1, v2]) => {
    treeMap.get(v1).push(v2);
    treeMap.get(v2).push(v1);
  });

  // 전선 제거함수
  const excludeWire = (startPoint, excludeWire) => {
    let count = 0; // 연결된 송전탑 개수
    const visited = new Array(n + 1).fill(false); // 방문한 송전탑을 체크할 배열, 송전탑은 1번부터 있기 때문에 n + 1로 생성
    visited[startPoint] = true; // startPoint는 방문했으니 true
    const ways = [startPoint]; // startPoint로부터 연결되어있는 모든 송전탑들을 저장할 배열

    // 연결되어있는 송전탑이 있을 때
    while (ways.length) {
      const currentPoint = ways.shift(); // 현재 송전탑 추출
      count++; // 연결된 송전탑 개수++

      // treeMap에서 현재 송전탑과 연결된 송전탑들을 get하여 순회
      treeMap.get(currentPoint).forEach((point) => {
        // 현재 송전탑과 연결된 송전탑 전선이 제거하려는 전선인지 확인
        const isExcludeWire =
          (currentPoint === excludeWire[0] && point === excludeWire[1]) ||
          (currentPoint === excludeWire[1] && point === excludeWire[0]);
        if (isExcludeWire) return; // 제거하려는 전선이면 return
        // 방문하지 않은 송전탑일 경우에
        if (visited[point] !== true) {
          visited[point] = true; // 방문한 송전탑으로 변경
          ways.push(point); // 정상적으로 연결된 송전탑이니 ways에 push
        }
      });
    }

    // count return
    return count;
  };

  // wires를 순회
  wires.forEach(([v1, v2]) => {
    // v1을 기준으로 현재 전선을 끊었을 때 연결된 송전탑 개수
    const firstCount = excludeWire(v1, [v1, v2]);
    const secondCount = n - firstCount; // 총 송전탑 개수에서 firstCount 빼면 나머지 송전탑의 개수
    const gap = Math.abs(firstCount - secondCount); // 절댓값 계산
    answer = Math.min(answer, gap); // answer에 기존 gap과 새로은 gap중 낮은 값 할당
  });

  return answer;
}
