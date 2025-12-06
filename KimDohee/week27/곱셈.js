/*
수학 1 - 곱셈 (https://www.acmicpc.net/problem/1629)
자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 이를 C로 나눈 나머지를 구하는 프로그램을 작성하시오.
*/

function solution(input) {  
  let [A, B, C] = input.split(' ').map(BigInt);

  let result = 1n;
  A = A % C;

  while (B > 0n) {
    // B가 홀수일 때
    if (B % 2n === 1n) { 
      result = (result * A) % C;
    }
    A = (A * A) % C;
    B = B / 2n;

  }
  return result.toString();
}


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));