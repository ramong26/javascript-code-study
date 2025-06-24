function solution(tickets) {
  let answer = null;

  // 티켓을 알파벳 순으로 먼저 정렬
  tickets.sort();

  function DFS(remainingTickets, current, path) {
    if (answer) return; // 정답 찾으면 더 이상 탐색 안 함

    if (remainingTickets.length === 0) {
      answer = path;
      return;
    }

    for (let i = 0; i < remainingTickets.length; i++) {
      const [from, to] = remainingTickets[i];
      if (from === current) {
        const copied = [...remainingTickets];
        copied.splice(i, 1);
        DFS(copied, to, [...path, to]);
      }
    }
  }

  DFS(tickets, "ICN", ["ICN"]);
  return answer;
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
);

console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
);
