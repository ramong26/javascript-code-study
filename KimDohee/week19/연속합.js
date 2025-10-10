// 연속합 (https://www.acmicpc.net/problem/1912)
// n개의 정수로 이루어진 임의의 수열이 주어진다. 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다. 단, 수는 한 개 이상 선택해야 한다.

function solution(input) {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0]);
  const numbers = lines[1].split(' ').map(Number);

  // 첫번째 원소로 초기화 (최소 하나는 선택해야 하기 때문에)
  let currentSum = numbers[0];
  let result = numbers[0];

  for (let i = 1; i < n; i++) {   // numbers[0]으로 초기화 했기 때문에 i = 1부터 시작
    currentSum = Math.max(currentSum + numbers[i], numbers[i]);  // 그리디: 이전 연속합에 더하는 방법 vs 새로 시작하는 방법중 큰값 선택
    result = Math.max(result, currentSum);
  }

  return result;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
