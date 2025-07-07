function solution(n, vertex) {
    // 1. 그래프를 인접리스트로 변환
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (const [a, b] of vertex) {  // 간선을 순회하며 인접리스트에 추가
        graph[a].push(b);      
        graph[b].push(a);     
    }
    
    // BFS 초기화
    // distances[i] = 1번 노드에서 i번 노드까지의 최단 거리
    const distances = Array(n + 1).fill(-1);
    const queue = [1];      // 1번 노드가 시작점
    distances[1] = 0;       // 시작점의 거리는 0 
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        // 현재 노드와 연결된 모든 이웃 노드들을 확인
        for (const neighbor of graph[current]) {
            if (distances[neighbor] === -1) {
                distances[neighbor] = distances[current] + 1;   // 현재 노드에서 이웃으로 가려면 간선 1개 필요

                queue.push(neighbor);
            }
        }
    }
    
    const maxDistance = Math.max(...distances.slice(1));  // 인덱스 0은 사용하지 않으므로 slice(1)로 제거
    
    return distances.filter(distance => distance === maxDistance).length;
}
