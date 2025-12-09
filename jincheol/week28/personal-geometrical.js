// 문제 링크: [선 긋기](https://www.acmicpc.net/problem/2170)

// 실행: node jincheol/week28/personal-geometrical.js

/**
 *
 * @param {number} N 선분의 개수
 * @param {[number, number][]} lines 선분의 좌표들
 */
const solution = (N, lines) => {
  // 시작점 (x좌표) 기준으로 오름차순 정렬, 시작점이 같으면 끝점(y) 기준으로 오름차순 정렬
  lines.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  let [curStart, curEnd] = lines[0]; // 첫 번째 선분을 현재 선분으로 시작
  let sumLength = 0; // 길이 합

  // 두 번째 선분부터 순회
  for (let i = 1; i < N; i++) {
    const [nextStart, nextEnd] = lines[i]; // 현재 선분 다음 선분 좌표

    // 현재 선분과 다음 선분이 겹치거나 이어지는 경우
    // (다음 선분의 시작점이 현재 선분의 끝점보다 작으면)
    if (nextStart < curEnd) {
      // 겹치는 부분 처리를 위해 더 넓은 범위로 curEnd 갱신
      curEnd = Math.max(curEnd, nextEnd);
    }
    // 현재 선분이 다음 선분과 완전 분리된 경우
    else {
      sumLength += curEnd - curStart; // 현재까지 유효했던 선분 길이 계산 후 추가
      // 다음 선분을 현재 선분으로 갱신
      curStart = nextStart;
      curEnd = nextEnd;
    }
  }

  // 마지막으로 처리된 선분 길이 추가
  // for 루프가 종료됐을 때 마지막 선분은 else 문에 있는 계산 로직을 실행하지 못함
  // 현재 선분과 다음 선분을 비교하여 계산하는데 마지막 선분은 다음 선분이 없어서 if else로 비교할 수 없음
  sumLength += curEnd - curStart;

  return sumLength;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const lines = input.slice(1).map((v) => v.trim().split(' ').map(Number));
console.log(solution(N, lines));
