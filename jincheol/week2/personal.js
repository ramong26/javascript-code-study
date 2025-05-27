// 문제 링크: [프로세스](https://school.programmers.co.kr/learn/courses/30/lessons/42587)

// 문제 설명
// 운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다.
// 이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.
// 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
// 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
// 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
//   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
// 예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고,
// 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.
// 현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와
// 몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때,
// 해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

// 실행: node jincheol/week2/personal.js

function solution(priorities, location) {
  let runCount = 0; // 프로세스 실행 카운트
  // 큐를 우선순위와 원래 순서 객체로 생성
  const queue = priorities.map((val, index) => ({
    priority: val,
    index,
  }));

  // 큐에 프로세스가 존재하면
  while (queue.length > 0) {
    const curProcess = queue.shift(); // 큐의 첫번째 프로세스를 큐에서 꺼냄
    // 큐에 curProcess보다 우선순위가 높은 프로세스가 큐에 존재하는지 확인
    const hasHigherPriorityProcess = queue.some(
      (process) => process.priority > curProcess.priority
    );
    // 큐에 curProcess보다 우선순위가 높은 프로세스가 큐에 존재하면
    if (hasHigherPriorityProcess) {
      queue.push(curProcess); // 큐에 다시 넣기
    } else {
      // curProcess의 우선순위가 제일 높으면 프로세스 실행
      runCount++; // 실행 카운트 ++
      const isTargetProcess = curProcess.index === location; // 실행한 프로세스가 찾고 있는 프로세스인지 확인
      if (isTargetProcess) break; // 찾는 프로세스면 break;
    }
  }

  // 실행 카운트 return
  return runCount;
}

const ex_priorities_one = [2, 1, 3, 2];
const ex_priorities_two = [1, 1, 9, 1, 1, 1];

const ex_location_one = 2;
const ex_location_two = 0;

const ex_sol_one = solution(ex_priorities_one, ex_location_one);
const ex_sol_two = solution(ex_priorities_two, ex_location_two);
// 입출력 예시 결과값: 1, 5
console.log(ex_sol_one, ex_sol_two);
