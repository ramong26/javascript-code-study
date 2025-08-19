// 랜선자르기 - 이분탐색
// https://www.acmicpc.net/problem/1654

function solution(input) {
  const lines = input.trim().split('\n');
  const [K, N] = lines[0].split(' ').map(Number);
  
  const cables = [];

  for (let i = 1; i <= K; i++) {
    cables.push(Number(lines[i])); 
  }

  /**
   * 개수 확인 함수 - length 길이로 자를 때 나오는 개수
   * @param {number[]} cables - 가지고 있는 랜선들의 길이 배열
   * @param {number} legnth - 자르고자 하는 길이
   * @returns {number} length로 자를때 만들 수 있는 총 랜선 개수
   */
  function countCables(cables, length) {
    let count = 0;
    for (let cable of cables) {
      count += Math.floor(cable / length);
    }
    return count;
  }

  // 이분탐색
  let left = 1;
  let right = Math.max(...cables);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); 

    // mid 길이로 자를 때 N개 이상 만들 수 있는지 확인
    const count = countCables(cables, mid);
    
    if (count >= N) {
      answer = mid;  // answer에 저장
      left = mid + 1;  // 더 긴 길이 시도
    } else {           // N개 미만이면
      right = mid - 1; // 더 짧은 길이 시도
    }
  }

  // 결과 반환
  return answer;
}


// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
