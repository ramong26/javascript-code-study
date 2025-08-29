/**
 * BFS
 * 4연산 (https://www.acmicpc.net/problem/14395)
 * 정수 s를 t로 바꾸는 최소 연산 횟수
 * 연산
s = s + s; (출력: +)
s = s - s; (출력: -)
s = s * s; (출력: *)
s = s / s; (출력: /) (s가 0이 아닐때만 사용 가능)
 */

class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front == this.rear;
  }
}

function solution(input) {
  const [s, t] = input.trim().split(' ').map(Number);

  // 예외 처리
  if (s === t) return "0";

  // BFS 초기화
  const queue = new Queue();
  const visited = new Set();

  // 시작점: [현재값, 연산자 문자열]
  queue.push([s, ""]);
  visited.add(s);

  // BFS 탐색
  while (!queue.isEmpty()) {
    const [current, operations] = queue.pop();

    // 연산자 배열로 정의
    const operators = [
      ['*', current * current],
      ['+', current + current],
      ['-', current - current],
      ['/', current !== 0 ? current / current : null]  // 0이 아닐때만 1
    ];

    // 각 연산 시도
    for (const [op, nextValue] of operators) {
      // null 체크 (나눗셈에서 current가 0인 경우)
      if (nextValue === null) continue;

      // 목표 도달 확인
      if (nextValue === t) {
        return operations + op;
      }

      // 유효성 검사
      if (nextValue < 0 || nextValue > 1000000000) continue;

      // 방문 체크
      if (!visited.has(nextValue)) {
        visited.add(nextValue);
        queue.push([nextValue, operations + op]);
      }
    }
  }
  return "-1";  // 불가능한 경우
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
