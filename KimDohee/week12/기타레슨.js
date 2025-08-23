/** 이분탐색
 * 기타레슨 (https://www.acmicpc.net/problem/2343)
 * 블루레이에 총 N개의 강의가 들어가는데 M개의 블루레이를 녹화하기로 했다. 이때, 블루레이의 크기(녹화가능한 길이) 중 최소를 구하기
 * - 강의의 순서가 바뀌면 안된다.
 * - M개의 블루레이는 모두 같은 크기
 * - 강의 길이는 분 단위(자연수)
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);
  const times = lines[1].split(' ').map(Number);  // times - 각 강의의 길이 배열

  /**
   * M개 이하 블루레이 용량에
   * @param {number} capacity - 블루레이 당 최대 녹화 가능한 길이(용량)
   * @returns {boolean} M개 이하로 가능하면 true, 불가능하면 false
   */
  function addToBluray(capacity) {
    let count = 1;  // 블루레이 개수
    let currentSum = 0;  // 현재 블루레이에 담긴 강의 총길이

    // 현재 블루레이 사용량 = 0
    for (const time of times) {
      if (currentSum + time > capacity) {   // 용량이 초과되는 경우
        count++;   // 새로운 블루레이 시작하므로 블루레이 개수 증가
        currentSum = time;  // 새로운 블루레이에 현재 강의 추가
      } else {
        // 현재 블루레이에 추가 가능 -> 현재 강의 길이를 증가시킴 
        currentSum += time
      }
    }

    return count <= M;  // M개 이하로 가능하면 true 반환
  } 

  // 이분탐색 범위 설정
  let left = Math.max(...times);  // 가장 긴 강의 길이 (최소 필요 용량)
  let right = times.reduce((sum, time) => sum + time, 0);  // 모든 강의를 1개 블루레이에 담는 경우 길이 합
  let answer = right;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // mid 용량으로 가능한지 확인
    if (addToBluray(mid)) {
      answer = mid;
      right = mid -1;  // mid 용량으로 가능하다면 더 작은 용량도 시도
    } else {
      left = mid + 1;  // mid 용량으로 불가능하다면 더 큰 용량 시도
    }
  }

  return answer;
}


// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
