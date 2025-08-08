/**
 * 연산자 끼워넣기(2)
 * N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 또, 수와 수 사이에 끼워넣을 수 있는 연산자가 주어진다. 
 * 연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.
 * 연산자의 개수는 N-1보다 많을 수도 있다. 모든 수의 사이에는 연산자를 한 개 끼워넣어야 하며, 
 * 주어진 연산자를 모두 사용하지 않고 모든 수의 사이에 연산자를 끼워넣을 수도 있다.
 * 우리는 수와 수 사이에 연산자를 하나씩 넣어서, 수식을 하나 만들 수 있다. 이때, 주어진 수의 순서를 바꾸면 안 된다.
 */
function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const numbers = lines[1].split(' ').map(Number);
  const operators = lines[2].split(' ').map(Number);
  
  // 연산자 배열 생성
  const calculator = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => a < 0 ? -Math.floor(-a / b) : Math.floor(a / b)
  ];

  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;

  // count: 현재 선택한 연산자의 순서, result: 현재까지 계산된 결과값
  function recursive(count, result) {
    // 기저 조건 - 모든 연산자를 사용했을 때 최대값과 최소값 갱신
    if (count === N - 1) {
      max = Math.max(max, result);
      min = Math.min(min, result);
      return;
    }

    // 4가지 연산자를 시도  
    for (let i = 0; i < 4; i++) {
      if (operators[i] > 0) {
        const nextResult = calculator[i](result, numbers[count + 1]);
        operators[i]--;  // 연산자 사용
        recursive(count + 1, nextResult);
        operators[i]++;  // 백트래킹
      }
    }
    
  }
  
  recursive(0, numbers[0]);
  return `${max}\n${min}`;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
