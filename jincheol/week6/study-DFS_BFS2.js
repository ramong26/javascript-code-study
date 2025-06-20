// 문제 링크: [여행경로](https://school.programmers.co.kr/learn/courses/30/lessons/43164)

// 주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.
// 항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때,
// 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
// 주어진 공항 수는 3개 이상 10,000개 이하입니다.
// tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
// 주어진 항공권은 모두 사용해야 합니다.
// 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
// 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

// 실행: node jincheol/week6/study-DFS_BFS2.js

function solution(tickets) {
  let answer = []; // 정답 배열
  const ticketLen = tickets.length;
  const visited = Array(ticketLen).fill(false); // 사용한 티켓을 체크할 배열
  const ways = []; // 현재 방문중인 경로를 저장

  tickets.sort(); // 티켓을 사전순으로 저장 -> 가능한 경로가 2개 이상이면 사전순으로 앞서는 경로를 return해야 함

  // DFS 함수, city -> 현재 도착한 도시, count -> 현재까지 사용한 ticket 개수
  const fly = (city, count) => {
    ways.push(city); // 경로에 추가

    // 모든 도시를 방문했을 때
    if (count === ticketLen) {
      answer = ways; // answer에 현재까지 경로 할당
      return true; // 성공했음을 표시
    }

    // 현재 도시에서 출발하는 항공권을 찾기
    for (let i = 0; i < ticketLen; i++) {
      // 사용한 티켓이 아니고, 티켓의 출발지가 현재 도시일 때
      if (!visited[i] && tickets[i][0] === city) {
        visited[i] = true; // 티켓 사용 처리
        const next = tickets[i][1]; // 다음 도시
        // 재귀호출하여 다음 도시 탐색
        // 만약 true가 return되어 if문에 들어오면 더 이상 다른 경로를 탐색할 필요가 없으므로 return true
        if (fly(next, count + 1)) return true;

        // 백트래킹
        // 현재 경로가 유효하지 않거나 현재 티켓을 사용했을 때 모든 티켓을 사용하지 못할 때 미사용으로 되돌림
        visited[i] = false;
      }
    }

    // 현재 city에서 더이상 갈 수 있는 길이 없거나 모든 티켓을 사용하지 못하고 막다른 도시에 도착했을 경우
    // 현재 도시를 경로에서 제거 (백트래킹)
    ways.pop();

    return false; // 이 경로는 모든 티켓을 사용할 수 없기에 false
  };

  fly('ICN', 0); // ICN에서 출발

  return answer;
}

const ex_tickets_one = [
  ['ICN', 'JFK'],
  ['HND', 'IAD'],
  ['JFK', 'HND'],
];
const ex_tickets_two = [
  ['ICN', 'SFO'],
  ['ICN', 'ATL'],
  ['SFO', 'ATL'],
  ['ATL', 'ICN'],
  ['ATL', 'SFO'],
];

const ex_sol_one = solution(ex_tickets_one);
const ex_sol_two = solution(ex_tickets_two);
// 입출력 예시 결과값: ["ICN", "JFK", "HND", "IAD"], ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]
console.log(ex_sol_one, ex_sol_two);
