// 문제 링크: [단속카메라](https://school.programmers.co.kr/learn/courses/30/lessons/42884)

// 고속도로를 이동하는 모든 차량이 고속도로를 이용하면서 단속용 카메라를 한 번은 만나도록 카메라를 설치하려고 합니다.
// 고속도로를 이동하는 차량의 경로 routes가 매개변수로 주어질 때,
// 모든 차량이 한 번은 단속용 카메라를 만나도록 하려면 최소 몇 대의 카메라를 설치해야 하는지를 return 하도록 solution 함수를 완성하세요.
// 제한사항
// 차량의 대수는 1대 이상 10,000대 이하입니다.
// routes에는 차량의 이동 경로가 포함되어 있으며 routes[i][0]에는 i번째 차량이 고속도로에 진입한 지점,
// routes[i][1]에는 i번째 차량이 고속도로에서 나간 지점이 적혀 있습니다.
// 차량의 진입/진출 지점에 카메라가 설치되어 있어도 카메라를 만난것으로 간주합니다.
// 차량의 진입 지점, 진출 지점은 -30,000 이상 30,000 이하입니다.

// 실행: node jincheol/week4/personal-greedy.js

function solution(routes) {
  let camera = 0;
  // 차량의 진출 지점을 기준으로 오름차순으로 정렬
  const ascendingRoutes = routes.sort((a, b) => a[1] - b[1]);

  let cameraPosition = -Infinity; // 카메라 설치 위치
  for (let [enter, exit] of ascendingRoutes) {
    // console.log('current', camera, cameraPosition, [enter, exit]);
    // 카메라 설치 위치가 진입 지점보다 작으면 (단속을 하지 못하는 경우)
    if (cameraPosition < enter) {
      camera++; // 카메라 설치

      // 카메라 설치 위치를 진출 지점으로 변경
      // exit 위치에 설치하는 이유는
      // 현재 차량 단속 + 이후 차량들 중 진입 지점(enter)이 exit 위치보다 적은 경우까지 커버하기 위함
      // 즉 ascendingRoutes로 차량의 진출 지점이 낮은 순으로 정렬을 했기 때문에
      // if문의 조건은 설치한 카메라의 위치가 다음 차량들을 단속할 수 있는 상태인지 확인이 가능함
      // 카메라를 설치한 위치(exit)보다 먼저 진출한 차량은 이미 전 카메라로 단속을 할 수 있는 상태
      cameraPosition = exit;
      // console.log('install', camera, cameraPosition, [enter, exit]);
    }
  }

  return camera;
}

const ex_routes = [
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
];

const ex_sol = solution(ex_routes);
// 입출력 예시 결과값: 2
console.log(ex_sol);
