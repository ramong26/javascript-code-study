// 문제 링크: [곱셈](https://www.acmicpc.net/problem/1629)

// 실행: node jincheol/week27/study-math1.js

/**
 *
 * @param {BigInt} A 밑수
 * @param {BigInt} B 지수
 * @param {BigInt} C 나누는 수
 */
const solution = (A, B, C) => {
  /**
   * 분할 정복을 이용하여 base 수를 exponent번 제곱한 수를 C로 나눴을 때 나머지를 구하는 함수
   * @param {BigInt} base 밑수
   * @param {BigInt} exponent 지수
   * @returns {BigInt} (base^exponent) % C
   */
  const modPow = (base, exponent) => {
    if (exponent === 0n) return 1n; // 종료 조건 A^0 = 1

    // 지수를 반으로 나누어 재귀적으로 계산
    const tmp = modPow(base, exponent / 2n); // BigInt에서 / 연산자는 정수 나눗셈을 수행한다 (소수점 이하를 버린다)

    // 지수가 짝수일 경우
    // A^B = (A^(B/2)) * (A^(B/2))
    // e.g. A^10 = A^(2 * 5) = A^5 * A^5
    // tmp가 A^5를 계산해주므로 tmp * tmp를 C로 나눈 나머지를 return
    if (exponent % 2n === 0n) {
      return (tmp * tmp) % C;
    }
    // 지수가 홀수일 경우
    // A^B = (A^(B/2)) * (A^(B/2)) * A
    // e.g. A^11 = A^(2 * 5 + 1) = A^5 * A^5 * A
    // tmp에서 A^5를 계산해주므로 (tmp * tmp * A)를 C로 나눈 나머지를 return하면 된다
    // (tmp * tmp * A) % C
    // = ((tmp * tmp) % C) * (A % C)
    // 만약 위 계산 결과가 C보다 클 경우 나머지를 구하는 것이기에 최종적으로
    // (((tmp * tmp) % C) * (A % C)) % C를 return한다
    else {
      return (((tmp * tmp) % C) * (base % C)) % C;
    }
  };

  const answer = modPow(A, B); // 계산

  return answer.toString(); // BigInt 형식을 변경
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const [A, B, C] = input[0].split(' ').map(BigInt);
console.log(solution(A, B, C));
