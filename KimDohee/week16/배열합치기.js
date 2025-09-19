/**
 * 분할정복 - 배열 합치기(https://www.acmicpc.net/problem/11728)
 * 정렬되어있는 두 배열 A와 B가 주어진다. 두 배열을 합친 다음 정렬해서 출력하는 프로그램을 작성하시오.
 * 
 * 투포인터 예시)
 * A = [3, 5]
 *      ↑
 * B = [2, 9]
 *      ×  ↑  (다음으로 이동)
 * result = [2]
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);
  const A = lines[1].split(' ').map(Number);
  const B = lines[2].split(' ').map(Number);

  const result = [];
  let i = 0, j = 0;

  // 두 배열을 비교하며 result에 병합
  while (i < N && j < M) {
    if (A[i] < B[j]) {
      result.push(A[i])
      i++;
    } else {
      result.push(B[j])
      j++;
    }
  }

  // 남은 원소들 처리
  // B 배열을 모두 처리했고 A 배열에 원소가 남아있을 때
  while (i < N) {
    result.push(A[i]);
    i++;
  }

  // A 배열을 모두 처리했고 B 배열에 원소가 남아있을 때
  while (j < M) {
    result.push(B[j]);
    j++;
  }

  return result.join(' ');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));