// 출발지점부터 도착지점까지 바위들이 놓여있을 때, 바위 n개를 제거한 뒤 각 지점 사이의 거리의 최솟값 중 가장 큰 값

function solution(distance, rocks, n) {
    var answer = 0;
    // rocks 정렬 후 도착점을 push
    rocks.sort((a, b) => a - b);
    rocks.push(distance);
    
    // 이분 탐색 범위 초기화
    let left = 1;
    let right = distance;
    
    // 이분 탐색 
    while (left <= right) {
        // left와 right의 중간값으로 시도
        const mid = Math.floor((left + right) / 2);
        
        // mid를 최소거리로 유지할 때의 결과 result
        const result = removeRocks(rocks, mid);
        console.log(`최소거리 ${mid} 시도 -> 제거: ${result.removed}개, 실제 치ㅗ소거리: ${result.actualMinDistance}`);
        
        if (result.removed <= n) {
            // 조건 만족: n개 이하로 제거 가능
            answer = result.actualMinDistance; // 실제 달성한 최소거리 저장
            left = mid + 1;  // 더 큰 거리로 다시 탐색
        } else {
            // 조건 불만족: n개 초과 제거해야 가능
            right = mid - 1  // 더 작은 거리로 다시 탐색
        }
    }
    
    return answer;
}

// 이분탐색 함수: 최소거리 minDistance를 유지하기 위해 제거해야할 바위 개수를 계산
function removeRocks(rocks, minDistance) {
    let prev = 0;   // 직전 바위 위치
    let removed = 0;    // 제거한 바위 개수
    let actualMinDistance = Infinity;   // 최소거리

    for (let i = 0; i < rocks.length; i++) {
        const current = rocks[i];  // 현재 바위 위치
        const gap = current - prev;  // 현재 구간 거리

        if (gap < minDistance) {
            // 거리 부족 -> 현재 바위 제거
            removed++;
        } else {
            // 거리 충분 -> 현재 바위 유지
            prev = current;
            actualMinDistance = Math.min(actualMinDistance, gap);
        }
    }
    return { removed, actualMinDistance };
}
