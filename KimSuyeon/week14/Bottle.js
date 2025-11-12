// https://www.acmicpc.net/problem/2251
// 2251 - 물통 - 골드 4

const input = require("fs")
  .readFileSync("./KimSuyeon/week14/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

// 접근 : 물통의 상태를 BFS로 탐색하면서 가능한 모든 상태를 구함 이때 A가 비어있는 상태에서 C의 물의 양을 결과에 추가
// 처음 C는 무조건 차있으니 처음은 더한 상태로 시작

function solution(input) {
  const [A, B, C] = input[0].split(" ").map(Number); // 8 9 10

  // A물통에 들어있는 물의 양, B물통에 들어있는 물의 양 기준으로 방문처리
  const visited = Array.from({ length: A + 1 }, () =>
    Array.from({ length: B + 1 }, () => false)
  );
  // 결과 저장을 위한 집합
  const result = new Set();

  const queue = [];
  queue.push([0, 0, C]); // 처음 상태

  while (queue.length) {
    const [a, b, c] = queue.shift();

    // 방문한 적 있으면 패스
    if (visited[a][b]) continue;
    visited[a][b] = true;

    // A가 비어있을 때 C의 물의 양 추가
    if (a === 0) {
      result.add(c);
    }

    // 각 물통에서 다른 물통으로 물을 옮기는 모든 경우의 수 총 6가지
    // move는 이동 가능한 최소 물의 양 (즉, 붓는 쪽에 남은 물과 받는 쪽의 빈 공간 중 더 작은 값)
    let move = Math.min(a, B - b);
    queue.push([a - move, b + move, c]);

    // A -> C
    move = Math.min(a, C - c);
    queue.push([a - move, b, c + move]);

    // B -> A
    move = Math.min(b, A - a);
    queue.push([a + move, b - move, c]);

    // B -> C
    move = Math.min(b, C - c);
    queue.push([a, b - move, c + move]);

    // C -> A
    move = Math.min(c, A - a);
    queue.push([a + move, b, c - move]);

    // C -> B
    move = Math.min(c, B - b);
    queue.push([a, b + move, c - move]);
  }

  // 계속 돌면서 모든 경우의 수를 구하면 wwhile문 종료
  input = Array.from(result)
    .sort((a, b) => a - b)
    .join(" ");
  return input;
}

console.log(solution(input));
// input 예시
// 8 9 10
