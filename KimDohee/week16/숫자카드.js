/**
 * 분할정복 알고리즘 - 숫자 카드 (https://www.acmicpc.net/problem/10815)
 * 숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.
 */

function solution(input) {
  const lines = input.trim().split('\n')
  const N = parseInt(lines[0]);
  const cardNumbers = lines[1].split(' ').map(Number);
  const M = parseInt(lines[2]);
  const checkNumbers = lines[3].split(' ').map(Number);

  cardNumbers.sort((a, b) => a - b)
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // 찾은 인덱스 반환
        } else if (arr[mid] < target) {
            left = mid + 1; // 오른쪽 절반 탐색
        } else {
            right = mid - 1; // 왼쪽 절반 탐색
        }
    }
    
    return -1; // 찾지 못함
  }

  const result = checkNumbers.map(num => binarySearch(cardNumbers, num) !== -1 ? 1 : 0);

  return result.join(' ');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
