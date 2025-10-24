/*
브루트포스 - A → B(https://www.acmicpc.net/problem/16953)
정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지이다.
- 2를 곱한다.
- 1을 수의 가장 오른쪽에 추가한다. 
A를 B로 바꾸는데 필요한 연산의 최솟값을 구해보자.
*/

function solution(input) {
  const [A, B] = input.trim().split(' ').map(Number);

  let current = B;
  let count = 1;  // 노드(상태) 개수를 세야하므로 1부터 시작

  // A보다 커질 동안 역순 변환
  while (current > A) {
    if (current % 2 === 0) {  // 끝자리가 짝수인 경우
      current = current / 2;
    } else if (current % 10 === 1) {  // 끝자리가 1인 경우
      current = Math.floor(current / 10); // 끝자리의 1 제거
    } else {  // 홀수인데 끝자리가 1이 아님: 변환 불가
      return -1;
    } 
    
    count++;
  }
  
  return current === A ? count : -1;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));