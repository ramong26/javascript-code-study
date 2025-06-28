// 문제 링크: [입국심사](https://school.programmers.co.kr/learn/courses/30/lessons/43238)

// n명이 입국심사를 위해 줄을 서서 기다리고 있습니다. 각 입국심사대에 있는 심사관마다 심사하는데 걸리는 시간은 다릅니다.
// 처음에 모든 심사대는 비어있습니다. 한 심사대에서는 동시에 한 명만 심사를 할 수 있습니다.
// 가장 앞에 서 있는 사람은 비어 있는 심사대로 가서 심사를 받을 수 있습니다. 하지만 더 빨리 끝나는 심사대가 있으면 기다렸다가 그곳으로 가서 심사를 받을 수도 있습니다.
// 모든 사람이 심사를 받는데 걸리는 시간을 최소로 하고 싶습니다.
// 입국심사를 기다리는 사람 수 n, 각 심사관이 한 명을 심사하는데 걸리는 시간이 담긴 배열 times가 매개변수로 주어질 때,
// 모든 사람이 심사를 받는데 걸리는 시간의 최솟값을 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 입국심사를 기다리는 사람은 1명 이상 1,000,000,000명 이하입니다.
// 각 심사관이 한 명을 심사하는데 걸리는 시간은 1분 이상 1,000,000,000분 이하입니다.
// 심사관은 1명 이상 100,000명 이하입니다.

// 실행: node jincheol/week7/study-binarySearch1.js

function solution(n, times) {
  let low = 1; // 최소 시간
  let high = Math.max(...times) * n; // 최대로 걸리는 시간
  let answer = high; // 초기 answer는 최대 시간으로 설정

  // 최소 시간과 최대 시간이 같아지기 전까지
  while (low <= high) {
    let mid = Math.floor((low + high) / 2); // 이분탐색을 위한 중간 시간
    // mid 시간내에 n명을 심사할 수 있는지 확인하기 위한 카운트
    let peopleCount = 0;

    // 심사관들을 순회
    for (let i = 0; i < times.length; i++) {
      peopleCount += Math.floor(mid / times[i]); // 각 심사관이 mid시간동안 처리할 수 있는 인원
      if (peopleCount >= n) break; // n명을 초과하면 계산할 필요가 없음
    }

    // mid 시간 안에 n명을 이상을 심사할 수 있다면 (시간이 남을 경우)
    if (peopleCount >= n) {
      answer = mid; // 현재까지 mid는 가능한 시간이라 answer에 할당
      high = mid - 1; // mid 시간동안 가능하기 때문에 다음 탐색에는 시간을 줄여서 탐색
    } else {
      low = mid + 1; // 더 긴 시간으로 늘려서 탐색
    }
  }

  return answer;
}
