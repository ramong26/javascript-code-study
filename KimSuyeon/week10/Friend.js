// https://www.acmicpc.net/problem/17089
// 세 친구 - 골드 4

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

const [N, M] = input[0].split(' ').map(Number); // N: 사람 수, M: 친구 관계 수
const list = Array.from({ length: N + 1 }, () => new Set()); // 인접 리스트 - 길이가 N+1인 배열 생성 각 배열 칸을 빈 Set으로 초기화

// 친구 관계 입력 받아 인접 리스트에 추가
for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(' ').map(Number);
  list[A].add(B);
  list[B].add(A);
}

// 최소 친구 수 합
let minSum = Infinity;

// 삼중 for문으로 모든 삼각형 탐색 u: 현재 기준 사람, v,w: 친구
for (let u = 1; u <= N; u++) {
  for (let v of list[u]) {
    // 중복 방지 작은 번호부터 시작
    if (u < v) {
      for (let w of list[u]) {
        // 삼각형 발견 + 중복 방지 역할
        if (w > u && list[v].has(w)) {
          //Set 객체의 원소 개수 - 2: 자기 자신과 친구 두 명 제외
          const sum =
            list[u].size - 2 + (list[v].size - 2) + (list[w].size - 2);
          minSum = Math.min(minSum, sum);
        }
      }
    }
  }
}
//  삼각형이 없으면 -1 출력, 있으면 최소 친구 합 출력
console.log(minSum === Infinity ? -1 : minSum);
// input 예시
// 5 6
// 1 2
// 1 3
// 2 3
// 2 4
// 3 4
// 4 5
