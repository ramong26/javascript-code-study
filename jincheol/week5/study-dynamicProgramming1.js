// 문제 링크: [정수 삼각형](https://school.programmers.co.kr/learn/courses/30/lessons/43105)

//     7
//    3 8
//   8 1 0
//  2 7 4 4
// 4 5 2 6 5
// 위와 같은 삼각형의 꼭대기에서 바닥까지 이어지는 경로 중, 거쳐간 숫자의 합이 가장 큰 경우를 찾아보려고 합니다.
// 아래 칸으로 이동할 때는 대각선 방향으로 한 칸 오른쪽 또는 왼쪽으로만 이동 가능합니다.
// 예를 들어 3에서는 그 아래칸의 8 또는 1로만 이동이 가능합니다.
// 삼각형의 정보가 담긴 배열 triangle이 매개변수로 주어질 때, 거쳐간 숫자의 최댓값을 return 하도록 solution 함수를 완성하세요.
// 제한사항
// 삼각형의 높이는 1 이상 500 이하입니다.
// 삼각형을 이루고 있는 숫자는 0 이상 9,999 이하의 정수입니다.

// 실행: node jincheol/week5/study-dynamicProgramming1.js

// top-down으로 해당 위치까지 내려오는 값 중 최댓값들을 저장하는 방식
function solution(triangle) {
  let answer = 0;

  // 원본 배열을 수정하지 않기 위해 복사했지만 시간 초과로 삭제
  // const sumTriangle = triangle.map((row) => [...row]);

  // 최상단 row를 제외하고 순회
  for (let i = 1; i < triangle.length; i++) {
    const row = triangle[i]; // row 선언
    // row를 순회
    for (let j = 0; j < row.length; j++) {
      // 맨 왼쪽과 오른쪽은 부모 값이 1개 밖이 없음
      // 맨 왼쪽일 때
      if (j === 0) {
        const soloParent = triangle.at(i - 1).at(j); // (i - 1) -> 윗 줄, j -> 맨 왼쪽
        triangle[i][j] += soloParent; // 삼각형의 값을 수정 (합)
        // 맨 오른쪽일 때
      } else if (j === row.length - 1) {
        const soloParent = triangle.at(i - 1).at(j - 1); // (i - 1) -> 윗줄, (j - 1) 맨 오른쪽
        triangle[i][j] += soloParent; // 삼각형의 값 수정
      } else {
        // 부모 값이 두가지일 때
        const leftParent = triangle.at(i - 1).at(j - 1); // (i - 1) -> 윗 줄, (j - 1) -> 왼쪽 부모
        const rightParent = triangle.at(i - 1).at(j); // (i - 1) -> 윗 줄, (j) -> 오른쪽 부모
        const maxParent = Math.max(leftParent, rightParent); // 부모의 값 중 더 큰 값을 찾아서
        triangle[i][j] += maxParent; // 현재 위치 값 + 큰 부모의 값을 해서 top-down으로 현재 위치까지 최대 값을 저장
      }
    }
  }

  answer = Math.max(...triangle.at(-1)); // 맨 아래 row 값 중 최댓값을 찾음

  return answer;
}

const ex_triangle = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]];

const ex_sol = solution(ex_triangle);
// 입출력 예시 결과값: 30
console.log(ex_sol);
