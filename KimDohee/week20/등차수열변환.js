/**
 * 브루트포스 - 등차수열 변환 
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const array = lines[1].split(' ').map(Number);

  if (N === 1 || N === 2) {
    return 0;  // 수열 크기가 1이면 등차수열
  }

  let minCount = Infinity;

  // 첫번째 원소의 가능한 값들을 순회 (+1, -1, 가만히 둔 경우)
  for (let i = -1; i <= 1; i++) {
    // 두번째 원소의 가능한 값들을 순회 (+1, -1, 가만히 둔 경우)
    for (let j = -1; j <= 1; j++) {
      let changeCount = 0;
      if (i !== 0) changeCount++;
      if (j !== 0) changeCount++;
      
      let num0 = array[0] + i;  // 첫번째 원소
      let num1 = array[1] + j;  // 두번째 원소

      // 결정된 공차
      let diff = num1 - num0;
      let isPossible = true;

      // let target = num0 + diff;  // [1]번째 숫자 = [0]번째 + 등차

      // 나머지 원소들 확인 (인덱스 2부터)
      for (let k = 2; k < N; k++) {
        // k번째 위치의 목표값
        let target = num0 + diff * k;  // [1]번째 숫자 = [0]번째 + 등차

        // 원래 값과의 차이
        let delta = target - array[k];

        // 연산이 -1, 0, 1이 아니면 불가능
        if (Math.abs(delta) > 1) {
          isPossible = false;
          break;
        }

        // 연산이 필요한경우 카운트 증가
        if (delta !== 0) {
          changeCount++; 
        }
      }

      if (isPossible) {
        minCount = Math.min(minCount, changeCount);
      }
    }
  }

  return minCount === Infinity ? -1 : minCount;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));