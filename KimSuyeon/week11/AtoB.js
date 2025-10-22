// https://www.acmicpc.net/problem/16953
// A → B - 실버 2

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('./KimSuyeon/week11/input2.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

const [A, B] = input[0].split(' ').map(Number); // 100 40021

function solution(A, B) {
  const queue = [[A, 1]]; // 현재값, 연산횟수
  const visited = new Set([A]); // 방문한 숫자들을 기록

  while (queue.length > 0) {
    // 첫번째 요소 제거하고 구조분해할당으로 저장
    // [current, count]가 각각 [100, 1]로 저장
    const [current, count] = queue.shift();

    // 목표달성
    if (current === B) return count;

    // 다음 연산들
    const next = [current * 2, current * 10 + 1];

    for (const nextVal of next) {
      if (nextVal <= B && !visited.has(nextVal)) {
        visited.add(nextVal);
        queue.push([nextVal, count + 1]);
      }
    }
    // for 문을 돌면서 visited에 다음 연산이 없으며 해당 큐에 추가해서 while문을 계속 돌게 함
    // 따라서 해당 큐가 없어질 때까지 돌게됨
  }
  // 불가능할겅여
  return -1;
}

console.log(solution(A, B));

// input 예시
// 100 40021
