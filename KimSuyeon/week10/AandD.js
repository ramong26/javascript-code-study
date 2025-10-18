// https://www.acmicpc.net/problem/17088
// 등차수열 반환 - 골드 4

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

// 인풋 예시에서 나열된 숫자들을 등차수열로 만들어야 함
// 각 원소는 0, 1, -1을 더하거나 빼서 만들 수 있음
// 등차수열로 만들기 위해 필요한 최소한의 연산 횟수를 구하기
// ai 설명 : 첫 번째와 두 번째 원소를 기준으로 공차를 구해야 함

const N = Number(input[0]); // 수의 개수
const arr = input[1].split(' ').map(Number); // [ 24, 21, 14, 10 ]

function solve() {
  // 첫 번째와 두 번째 원소를 ±1 한 경우의 수를 알아야 함
  const firstOptions = [arr[0] - 1, arr[0], arr[0] + 1]; // 23, 24, 25
  const secondOptions = [arr[1] - 1, arr[1], arr[1] + 1]; // 20, 21, 22

  // 현재까지 찾은 최소 연산 횟수
  let minOperations = Infinity;

  for (let first of firstOptions) {
    for (let second of secondOptions) {
      const d = second - first; // 공차 계산
      let plus = 0; // 현재 후보 수열에서 필요한 연산 횟수

      // 첫 두 원소 연산 횟수 계산

      // 첫 번째 원소가 변경되었는지 확인하고 다르면 연산 횟수 증가
      if (first !== arr[0]) plus++;
      if (second !== arr[1]) plus++;

      let valid = true; // 이 후보가 가능한지 여부

      // 나머지 원소 검사
      for (let i = 2; i < N; i++) {
        const expected = first + d * i; // i번째 위치에서 등차수열이라면 나와야 하는 값
        const diff = Math.abs(arr[i] - expected); // abs 절댓값

        // ??
        if (diff > 1) {
          valid = false; // ±1 범위를 넘어가면 불가능
          break;
        } else if (diff === 1) {
          plus++; // 한 번 연산 필요
        }
        // diff === 0 → 연산 없음
      }

      if (valid) {
        minOperations = Math.min(minOperations, plus);
      }
    }
  }

  console.log(minOperations === Infinity ? -1 : minOperations);
}

solve();
// input 예시
//  4
// 24 21 14 10
