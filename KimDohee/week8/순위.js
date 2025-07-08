function solution(n, results) {
    // 인접 리스트로 그래프 구성
    const wins = Array(n + 1).fill(null).map(() => []); // i가 이기는 선수들
    const loses = Array(n + 1).fill(null).map(() => []); // i가 지는 선수들
    
    for (const [winner, loser] of results) {
        wins[winner].push(loser);
        loses[loser].push(winner);
    }
    
    // DFS로 도달 가능한 모든 노드 찾기
    function dfs(graph, start, visited) {
        visited[start] = true;
        let count = 1;
        
        for (const next of graph[start]) {
            if (!visited[next]) {
                count += dfs(graph, next, visited);
            }
        }
        return count;
    }
    
    let answer = 0;
    
    for (let i = 1; i <= n; i++) {
        // i가 이길 수 있는 선수 수 (DFS로 탐색)
        const winVisited = Array(n + 1).fill(false);
        const winCount = dfs(wins, i, winVisited) - 1; // 자기 자신 제외
        
        // i를 이길 수 있는 선수 수 (역방향 DFS)
        const loseVisited = Array(n + 1).fill(false);
        const loseCount = dfs(loses, i, loseVisited) - 1; // 자기 자신 제외
        
        // 모든 다른 선수와 승부 관계가 확정되면 순위 확정
        if (winCount + loseCount === n - 1) {
            answer++;
        }
    }
    
    return answer;
}


