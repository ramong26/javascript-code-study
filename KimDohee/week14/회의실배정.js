/**
 * 그리디 알고리즘 - 회의실 배정 문제
 * 한개의 회의실을 사용하고자 하는 N개의 회의에 대하여 회의실을 사용할 수 있는 회의의 최대 개수 찾기
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);  // N: 회의의 수

  const meetings = [];  // 회의를 [시작시간, 끝시간] 배열로 저장
  for (let i = 1; i <= N; i++) {
    const [start, end] = lines[i].split(' ').map(Number);
    meetings.push([ start, end ]);
  }

  // 끝나는 시간 기준으로 정렬
  meetings.sort((a, b) => {
    if (a[1] === b[1]) {   // 끝나는 시간(인덱스1)
      return a[0] - b[0];  // 끝나는 시간이 같으면 시작시간 기준으로 정렬
    }
    return a[1] - b[1];
  });

  // 그리디 선택
  let count = 0;
  let lastEnd = 0;  // 모든 시간이 0 이상이므로 초기값은 0으로

  for (let i = 0; i < meetings.length; i++) {
    const [start, end] = meetings[i];

    // 이전 회의가 끝난 후 다음 회의가 시작되어야 함
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  
  return count;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
