// 문제 링크: [다각형의 면적](https://www.acmicpc.net/problem/2166)

// 실행: node jincheol/week28/study-geometrical2.js

/**
 * 신발끈 공식 사용해야 한다고 함
 * @param {number} N 점의 개수
 * @param {[BigInt, BigInt][]} dots 점의 좌표들
 */
const solution = (N, dots) => {
  // 신발끈 공식을 위한 두 면적 변수 초기화
  let sum1 = 0n;
  let sum2 = 0n;

  for (let i = 0; i < N; i++) {
    const nextIdx = (i + 1) % N; // 다음 점 인덱스 -> 만약 i + 1이 N과 같으면 시작점으로 돌아가야 함 (마지막 점)
    const [curX, curY] = dots[i]; // 현재 점 좌표
    const [nextX, nextY] = dots[nextIdx]; // 다음 점 좌표

    // 면적 더하기 (사선 곱셈 => 신발끈 공식 과정)
    sum1 += curX * nextY;
    sum2 += curY * nextX;
  }

  // 최종 면적은 |sum1 - sum2| / 2
  // Math.abs()는 BigInt를 지원하지 않고, Number로 변환했을 때 숫자가 크면 오류가 발생하므로 삼항연산자 사용
  const absDiff = sum1 > sum2 ? sum1 - sum2 : sum2 - sum1;
  // 소수점 2째 자리에서 반올림하면 되는 것이기에 Nuber 타입으로 변환해도 정밀도 차이가 없다
  const area = (Number(absDiff) / 2).toFixed(1);

  return area;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const dots = input.slice(1).map((v) => v.trim().split(' ').map(BigInt));
console.log(solution(N, dots));
