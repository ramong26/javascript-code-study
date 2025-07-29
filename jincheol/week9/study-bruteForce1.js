// 문제 링크: [연산자 끼워넣기](https://www.acmicpc.net/problem/14888)

// N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 또, 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다.
// 연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.
// 우리는 수와 수 사이에 연산자를 하나씩 넣어서, 수식을 하나 만들 수 있다. 이때, 주어진 수의 순서를 바꾸면 안 된다.
// 예를 들어, 6개의 수로 이루어진 수열이 1, 2, 3, 4, 5, 6이고, 주어진 연산자가 덧셈(+) 2개, 뺄셈(-) 1개, 곱셈(×) 1개, 나눗셈(÷) 1개인 경우에는 총 60가지의 식을 만들 수 있다.
// 예를 들어, 아래와 같은 식을 만들 수 있다.
// 1+2+3-4×5÷6
// 1÷2+3+4-5×6
// 1+2÷3×4-5+6
// 1÷2×3-4+5+6
// 식의 계산은 연산자 우선 순위를 무시하고 앞에서부터 진행해야 한다. 또, 나눗셈은 정수 나눗셈으로 몫만 취한다. 음수를 양수로 나눌 때는 C++14의 기준을 따른다.
// 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다. 이에 따라서, 위의 식 4개의 결과를 계산해보면 아래와 같다.
// 1+2+3-4×5÷6 = 1
// 1÷2+3+4-5×6 = 12
// 1+2÷3×4-5+6 = 5
// 1÷2×3-4+5+6 = 7
// N개의 수와 N-1개의 연산자가 주어졌을 때, 만들 수 있는 식의 결과가 최대인 것과 최소인 것을 구하는 프로그램을 작성하시오.

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
      return ~~(a / b);
    // 결과가 음수면 음수를 양수로 전환 후 소숫점 버리고 결과를 음수로 전환
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
