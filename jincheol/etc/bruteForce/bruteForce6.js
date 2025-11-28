// 문제 링크: [나3곱2](https://www.acmicpc.net/problem/16936)
// 실행: node jincheol/etc/bruteForce/bruteForce6.js

/**
 *
 * @param {number} N 수열의 크기
 * @param {number[]} arrB 수열 B
 */
const solution = (N, arrB) => {
  const bSet = new Set(arrB); // 수열 B를 Set으로 저장

  /**
   * 시작 숫자로 수열 A를 생성하는 함수
   * @param {number} startNum 시작 숫자
   * @returns {number[] | null} 수열 A, 실패 시 null 반환
   */
  const getSequence = (startNum) => {
    const A = [startNum]; // 수열 초기화
    let cur = startNum; // 현재 숫자

    // N - 1번 순회 (연산 횟수)
    for (let i = 0; i < N - 1; i++) {
      let next = null;

      const nextMulti = cur * 2n; // 곱2 연산
      if (bSet.has(nextMulti)) next = nextMulti; // 수열 B에 있으면 다음 숫자로 갱신

      // 3의 배수인지 확인
      if (cur % 3n === 0n) {
        const nextDivide = cur / 3n; // 나3 연산
        // 수열 B에 있으면
        if (bSet.has(nextDivide)) {
          // 만약 다음 숫자가 갱신되어 있다면 잘못된 시작 수
          // 곱2로 찾았는데 나3에도 있으면 다음 수가 2개라 잘못됨
          if (next !== null) return null;

          next = nextDivide; // 다음 숫자가 없는 상태면 다음 숫자로 갱신
        }
      }

      if (next === null) return null; // 다음 수가 없거나 다음 수가 2개 이상인 경우(잘못된 경우)

      A.push(next); // 수열에 다음 수 추가
      cur = next; // 다음 계산할 숫자 갱신
    }

    return A; // 수열 반환
  };

  let answer = null; // 정답 수열

  // 수열 B 순회
  for (let start of arrB) {
    answer = getSequence(start); // start 숫자로 수열 A 생성
    if (answer !== null) break; // null 이 아니면 정상 수열 A가 생성된 경우라 종료
  }

  // 가능한 경우만 주어짐
  return answer.map(String).join(' '); // 조건에 맞게 변환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const arrB = input[1].split(' ').map(BigInt);
console.log(solution(N, arrB));
