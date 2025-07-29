// 문제 링크: [연산자 끼워넣기](https://www.acmicpc.net/problem/14888)

// 실행: node jincheol/week9/study-bruteForce1.js

const fs = require('fs');
const input = fs
  .readFileSync('./jincheol/week9/input1.txt')
  .toString()
  .split('\n');

const ex_n_one = parseInt(input[0]);
const ex_numbers_one = input[1].split(' ').map(Number);
const ex_operators_one = input[2].split(' ').map(Number);
const ex_n_two = parseInt(input[3]);
const ex_numbers_two = input[4].split(' ').map(Number);
const ex_operators_two = input[5].split(' ').map(Number);
const ex_n_three = parseInt(input[6]);
const ex_numbers_three = input[7].split(' ').map(Number);
const ex_operators_three = input[8].split(' ').map(Number);

const calc = (a, b, operatorIndex) => {
  switch (operatorIndex) {
    case 0: // 덧셈
      return a + b;
    case 1: // 뺄셈
      return a - b;
    case 2: // 곱셈
      return a * b;
    case 3: // 나눗셈
      // 비트연산자를 사용해야 통과가 된다.. 이유는 찾아봐도 정확히 모르겠음
      return ~~(a / b);
    // if (a < 0) return -Math.floor(Math.abs(a) / b);
    // else Math.floor(a / b);

    // if (a < 0 && b > 0) return -Math.floor(Math.abs(a) / b);
    // else return Math.floor(a / b);

    // if (a < 0 && b > 0) return -Math.floor(Math.abs(a) / b);
    // if (a > 0 && b < 0) return -Math.floor(a / Math.abs(b));
    // return Math.floor(a / b);
  }
};

const solution = (n, numbers, operators) => {
  // 초기값 설정
  let max = -Infinity;
  let min = Infinity;

  /**
   *
   * @param {nunber} numIdx 현재 처리할 숫자의 인덱스
   * @param {number} curResult 현재까지 계산된 값
   * @param {number[]} op 남은 연산자 개수의 배열 [+, -, *, /]
   * @returns
   */
  const dfs = (numIdx, curResult, op) => {
    // 종료 조건
    if (numIdx === n) {
      max = Math.max(max, curResult); // 최댓값 계산
      min = Math.min(min, curResult); // 최솟값 계산
      return;
    }

    // 연산자 순회 (+, -, *, /) 순서
    for (let i = 0; i < 4; i++) {
      // 연산자가 남아있을 경우
      if (op[i] > 0) {
        op[i] -= 1; // 연산자 사용 -> 연산자 수 감소

        const nextResult = calc(curResult, numbers[numIdx], i); // 계산 결과
        dfs(numIdx + 1, nextResult, op); // 재귀 호출

        op[i] += 1; // 백트레킹 -> 사용한 연산자 수 복구
      }
    }
  };

  dfs(1, numbers[0], operators); // dfs 실행

  console.log(max);
  console.log(min);
};

solution(ex_n_one, ex_numbers_one, ex_operators_one);
solution(ex_n_two, ex_numbers_two, ex_operators_two);
solution(ex_n_three, ex_numbers_three, ex_operators_three);
