/**
 * 그리디 알고리즘 - ATM 문제 (https://www.acmicpc.net/problem/11399)
 * ATM 1대에서 1번부터 N번까지 N명의 사람들이 돈을 인출하는데 필요한 총 대기시간의 최솟값
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = Number(lines[0]);
  const times = lines[1].split(' ').map(Number);

  // 정렬
  times.sort((a, b) => a - b);

  let currentSum = 0;   // 누적시간
  let totalTime = 0;    // 총 대기시간

  // 총 대기시간 계산
  for (let i = 0; i < times.length; i++) {
    currentSum += times[i];  // 현재까지의 누적 시간
    totalTime += currentSum;  // 현재 사람의 대기시간을 총합에 추가
  }

  return totalTime;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
