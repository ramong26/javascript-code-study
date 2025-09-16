/** 분할정복 - 숫자카드2 (https://www.acmicpc.net/problem/10816)
 * 숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 몇 개 가지고 있는지 구하는 프로그램을 작성하시오.
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const cardNumbers = lines[1].split(' ').map(Number);
  const M = parseInt(lines[2]);
  const checkNumbers = lines[3].split(' ').map(Number);

  // 정렬하기
  cardNumbers.sort((a, b) => a - b);

  /**
   * 정렬된 배열에서 target 값의 lower bound를 찾는 이진 탐색 함수
   * Lower bound: target 이상의 값이 처음 나타나는 위치
   * @param {number[]} arr - 정렬된 숫자 배열 
   * @param {number} target - 찾고자하는 목표값
   * @returns {number} target 이상의 값이 처음 나타나는 인덱스
   */
  function binarySearchLower(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }
  function binarySearchUpper(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] <= target) {  // <= 주의!
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  const result = checkNumbers.map(num => {
    const lower = binarySearchLower(cardNumbers, num);
    const upper = binarySearchUpper(cardNumbers, num);
    return upper - lower;  // 개수
  });

  return result.join(' ');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
