/** 퇴사
 * https://www.acmicpc.net/problem/14501
 * 오늘부터 N+1일째 되는 날 퇴사를 하기 위해서, 남은 N일 동안 최대한 많은 상담을 하려고 한다.
 * 각각의 상담은 상담을 완료하는데 걸리는 기간 Ti와 상담을 했을 때 받을 수 있는 금액 Pi로 이루어져 있다.
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const T = [0];  // 인덱스 0은 사용 안함
  const P = [0];  // 인덱스 0은 사용 안함

  for (let i = 1; i <= N; i++) {
    const [t, p] = lines[i].split(' ').map(Number);
    T.push(t);
    P.push(p);
  }

  function dfs(day) {
    // 종료 조건 - 퇴사일(N+1)에 도달하면 상담할 수 없음
    if (day > N) return 0;

    // 1. 현재 날짜 상담을 건너뛰는 경우
    let profitSkip = dfs(day + 1);

    // 2. 현재 날짜 상담을 선택하는 경우
    let profitTake = 0;

    if (day + T[day] - 1 <= N) {
      // 현재 상담 수익 + 다음 상담부터의 최대 수익
      profitTake = P[day] + dfs(day + T[day]);
    }

    // 더 큰 수익 반환
    return Math.max(profitSkip, profitTake);
  }

  return dfs(1);  // 1일차부터 시작
}


// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
