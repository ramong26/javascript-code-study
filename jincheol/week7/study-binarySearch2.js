// 문제 링크: [징검다리](https://school.programmers.co.kr/learn/courses/30/lessons/43236)

// 출발지점부터 distance만큼 떨어진 곳에 도착지점이 있습니다.
// 그리고 그사이에는 바위들이 놓여있습니다. 바위 중 몇 개를 제거하려고 합니다.
// 예를 들어, 도착지점이 25만큼 떨어져 있고,
// 바위가 [2, 14, 11, 21, 17] 지점에 놓여있을 때 바위 2개를 제거하면 출발지점, 도착지점, 바위 간의 거리가 아래와 같습니다.
// 제거한 바위의 위치 |	각 바위 사이의 거리 |	거리의 최솟값
// [21, 17]           |	[2, 9, 3, 11]       |	2
// [2, 21]	          | [11, 3, 3, 8]       |	3
// [2, 11]            |	[14, 3, 4, 4]	      | 3
// [11, 21]           |	[2, 12, 3, 8]	      | 2
// [2, 14]           	| [11, 6, 4, 4]	      | 4
// 위에서 구한 거리의 최솟값 중에 가장 큰 값은 4입니다.
// 출발지점부터 도착지점까지의 거리 distance, 바위들이 있는 위치를 담은 배열 rocks, 제거할 바위의 수 n이 매개변수로 주어질 때,
// 바위를 n개 제거한 뒤 각 지점 사이의 거리의 최솟값 중에 가장 큰 값을 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 도착지점까지의 거리 distance는 1 이상 1,000,000,000 이하입니다.
// 바위는 1개 이상 50,000개 이하가 있습니다.
// n 은 1 이상 바위의 개수 이하입니다.

// 실행: node jincheol/week7/study-binarySearch2.js

function solution(distance, rocks, n) {
  rocks.sort((a, b) => a - b); // 바위들의 거리를 오름차순으로 정렬
  const ascendingRocks = [0, ...rocks, distance]; // 계산 편의를 위해 시작지점 0과 도착점 추가

  let answer = 0;
  let low = 1; // 최소 바위 사이 거리
  let high = distance; // 최대 바위 사이 거리

  while (low <= high) {
    let mid = Math.floor((low + high) / 2); // 중간 지점
    let removeRockCount = 0; // 바위 제거 카운트
    let position = 0; // 바위 사이의 거리를 계산하기 위한 이전 바위 지점

    // 바위 사이 값 오류 for 루프
    // for (let i = 0; i < ascendingRocks.length - 1; i++) {
    //   const first = ascendingRocks.at(i);
    //   const second = ascendingRocks.at(i + 1);
    //   const gap = second - first;
    // }

    for (let i = 1; i < ascendingRocks.length; i++) {
      const curRock = ascendingRocks.at(i); // 현재 바위
      const gap = curRock - position; // 바위 사이 거리 계산

      // 바위 사이 거리가 mid보다 작으면 제거, 최소 거리 mid를 확보하기 위해서
      if (gap < mid) removeRockCount++;
      else position = curRock; // mid 이상이면 현재 바위를 남기고 다음 거리 측정을 위해 현재 바위를 position으로 설정
    }

    // n개 이하로 제거 가능하면
    if (removeRockCount <= n) {
      answer = mid; // 현재 가능한 값은 mid라 할당
      low = mid + 1; // 더 큰 mid 값을 찾기 위해 low 증가
    } else {
      high = mid - 1; // n개 초과로 제거해야하면 mid를 줄여야하기에 high 감소
    }
  }

  return answer;
}
