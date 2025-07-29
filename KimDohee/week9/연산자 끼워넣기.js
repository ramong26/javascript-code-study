// 브루트포스 - 연산자 끼워넣기
// 링크: https://www.acmicpc.net/problem/14888

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
