// 브루트포스 - 연산자 끼워넣기
// 링크: https://www.acmicpc.net/problem/14888
// N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 
// 또, 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다. 연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.
// 우리는 수와 수 사이에 연산자를 하나씩 넣어서, 수식을 하나 만들 수 있다. 
// 이때, 주어진 수의 순서를 바꾸면 안 된다.
// N개의 수와 N-1개의 연산자가 주어졌을 때, 만들 수 있는 식의 결과가 최대인 것과 최소인 것을 구하는 프로그램을 작성하시오.

const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .split('\n')
  .map(v => v.split(' ').map(Number));

const [[N], numbers, operators] = input;

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;

const calculator = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a < 0 ? -Math.floor(-a / b) : Math.floor(a / b)
];

function dfs(count, result) {
  if (count === N - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
    return;
  }
  
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === 0) continue;
    
    operators[i]--;
    dfs(count + 1, calculator[i](result, numbers[count + 1]));
    operators[i]++;
  }
}

dfs(0, numbers[0]);

// 0과 -0 예외 처리: falsy 값일 때 0으로 출력
console.log(max ? max : 0);
console.log(min ? min : 0);
