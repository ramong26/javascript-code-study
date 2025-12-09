/*
기하 - 선긋기 (https://www.acmicpc.net/problem/2170)
도화지에 선을 그었을 때, 그려진 선들의 총 길이를 구하기. 이미 선이 있는 위치에 겹쳐서 그릴수도 있음
*/

function solution(input) {
  const lines = input.split('\n');
  const n = parseInt(lines[0]);  // 첫째 줄에 선을 그은 횟수 n
  const points = [];  // 두 점의 위치

  for (let i = 1; i <= n; i++) {
    const [x, y] = lines[i].split(' ').map(Number);
    points.push([x, y]);
  }

  // 시작점(같으면 끝점) 기준으로 정렬
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  // 첫번째 선분으로 초기화
  let currentStart = points[0][0];   // 현재 합쳐지고 있는 선분의 시작점
  let currentEnd = points[0][1];
  let totalLength = 0;

  // 겹치는지 판단 후 합치기
  for (let i = 1; i < n; i++) {
    const [start, end] = points[i];

    // 1. 현재 선분과 겹치거나 연결됨
    if (start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);  // 끝점을 더 큰값으로 갱신
    }
    // 2. 떨어져 있음 -> 현재 선분 종료 후 새로운 선분 시작
    else {
      // 이전 구간의 길이를 더하고
      totalLength += currentEnd - currentStart;

      // 새로운 구간 시작
      currentStart = start;
      currentEnd = end;

    }
  }
  totalLength += currentEnd - currentStart;
  return totalLength;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));