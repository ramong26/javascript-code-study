// 문제 링크: [동전 뒤집기](https://www.acmicpc.net/problem/1285)

// 실행: node jincheol/week14/personal-greedy.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week14/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 한 행 또는 한 열의 놓인 동전의 수
 * @param {string[]} coins 동전의 초기 상태 배열
 */
const solution = (N, coins) => {
  let minT = Infinity; // 최종 답

  // 완전 탐색 구간 (행 뒤집기)
  // 같은 행이나 열을 2번 뒤집을 필요 없고, 순서도 상관이 없다,
  // 비트 마스킹을 사용하여 N개의 행을 뒤집는 경우의 수 (2^N)을 순회
  // e.g. N이 3 -> 2^N의 경우 (000 100 010 001 110 101 011 111) 8개
  // for문의 조건은 1 << 3 -> 001에서 1을 왼쪽으로 3칸 이동 -> 1000 = 8 즉 i < 8임 (2진수)
  // Math.pow(2, N)도 가능하지만 속도가 상대적으로 느리고 부동 소수점을 반환, N이 30 이하인 경우에 비트 연산자 사용 가능
  for (let i = 0; i < 1 << N; i++) {
    let curTotalT = 0; // 현재 행 조합에서 만들 수 있는 최소 뒷면 개수

    // 그리디 알고리즘 구간
    // 완전 탐색에서 정해진 행 조합에서 각 열을 확인하며 뒷면이 많으면 해당 열을 뒤집는다.
    for (let col = 0; col < N; col++) {
      let curColT = 0; // 하나의 열에서 뒷면 개수

      // 동전을 뒤집을지 말지 결정을 위한 루프, 현재 열의 뒷면 개수를 셈
      for (let row = 0; row < N; row++) {
        let curCoin = coins[row][col]; // 현재 동전 (col열에 해당하는 row행을 순차적으로 조회)

        // i의 row 번째 비트가 1이면 행을 뒤집기
        // 1 << row는 row번째 비트만 1이고 나머지는 0인 숫자를 생성
        // e.g. N = 4일 때) row가 0이면 0001, 1이면 0010, 2이면 0100 ...
        // & 연산자는 비트 AND 연산자. 두 숫자의 같은 위치에 있는 비트가 모두 1일 때만 결과가 1이다
        // e.g. i가 13이고 row가 2일 경우) 13은 1101 -> 0, 2, 3번행을 뒤집는 경우, 1 << 2는 0100 -> 001에서 1을 왼쪽으로 2번 이동 (2번 행 검사)
        // 1101 & 0100 은 0100임 = 4 (2째 행 자리만 서로 1이기 때문) -> !== 0 으로 뒤집어야 하는 행임을 알 수 있음
        // -> 1101은 0, 2, 3번 행을 뒤집어야 하는 경우임. 1 << row로 뒤집어야하는 행을 확인하고 뒤집는다
        if ((i & (1 << row)) !== 0) {
          curCoin = curCoin === 'H' ? 'T' : 'H';
        }
        // 현재 동전이 뒷면이면 curColT++
        if (curCoin === 'T') curColT++;
      }
      // 특정 행 조합에서 각 열을 뒤집었을 때와 뒤집지 않았을 때 뒷면의 개수가 더 적은 값을 더해준다
      curTotalT += Math.min(curColT, N - curColT);
    }

    minT = Math.min(minT, curTotalT); // 최종 값에 두 값 중 작은 값을 할당
  }

  return minT;
};

const N = parseInt(input.shift());
const coins = input.map((v) => v.trim());
console.log(solution(N, coins));
