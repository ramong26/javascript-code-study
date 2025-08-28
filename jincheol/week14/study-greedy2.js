// 문제 링크: [회의실 배정](https://www.acmicpc.net/problem/1931)

// 실행: node jincheol/week14/study-greedy2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week14/input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N
 * @param {Array<[number, number]>} meetings
 */
const solution = (N, meetings) => {
  // const ascendingMeetings = meetings.sort((a, b) => a[1] - b[1]);
  // 회의 시간을 종료 시간 기준 오름차순 정렬 (같을 경우 시작 시간 우선)
  const ascendingMeetings = meetings.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let meetingCount = 0; // 회의 수
  let lastMeetingEnd = 0; // 마지막 회의 종료 시간

  for (let [startTime, endTime] of ascendingMeetings) {
    // 시작 시간이 마지막 회의 종료 시간보다 같거나 클 경우 -> 회의 할 수 있는 경우
    if (startTime >= lastMeetingEnd) {
      meetingCount++; // 회의 수++
      lastMeetingEnd = endTime; // 회의 종료 시간 갱신
    }
  }

  return meetingCount;
};

const N = parseInt(input.shift());
const meetings = input.map((v) => v.split(' ').map(Number));
console.log(solution(N, meetings));
