// https://www.acmicpc.net/problem/16938
// 캠프 준비

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('./KimSuyeon/week11/input4.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

// 문제요약
// N개의 문제 중 최소 2문제 이상을 골라서
// 난이도의 합이 L 이상 R 이하
// 난이도의 최대값과 최소값의 차이가 X 이상인 문제집을 만들 수 있는 경우의 수를 구하라

// N : 문제 갯수
// L : 난이도 합의 최소값
// R : 난이도 합의 최대값
// X : 난이도의 최대값과 최소값의 차이
const [N, L, R, X] = input[0].split(' ').map(Number); // 5 25 35 10
const difficulties = input[1].split(' ').map(Number);

let count = 0;

function solution(index, selected) {
  if (index === N) {
    //2개 이상 선택했을 때 조건 체크
    if (selected.length >= 2) {
      const sum = selected.reduce((a, b) => a + b, 0); // 선택된 문제들의 난이도 합계
      const max = Math.max(...selected);
      const min = Math.min(...selected);

      if (sum >= L && sum <= R && max - min >= X) {
        count++;
      }
    }
    return;
  }

  // 모든 문제 확인 완료

  // 현재 문제 선택
  solution(index + 1, [...selected, difficulties[index]]);
  // 현재 문제 선택 안함
  solution(index + 1, selected);
}
solution(0, []); // 처음에 0 번째 문제부터 시작, 선택된 문제 없음
console.log(count);

// input 예시
// 5 25 35 10
// 10 10 20 10 20
