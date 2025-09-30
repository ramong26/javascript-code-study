/**
 * 정렬 - 카드 (https://www.acmicpc.net/problem/11652)
 * 준규는 숫자 카드 N장을 가지고 있다. 숫자 카드에는 정수가 하나 적혀있는데, 적혀있는 수는 -2^62보다 크거나 같고, 2^62보다 작거나 같다.
준규가 가지고 있는 카드가 주어졌을 때, 가장 많이 가지고 있는 정수를 구하는 프로그램을 작성하시오.
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const map = new Map();
  const numbers = lines.slice(1).map(line => BigInt(line));

  // 각 카드의 개수 저장
  numbers.forEach(num => map.set(num, (map.get(num) || 0) + 1));

  // 가장 많이 가진 숫자 찾기
  let max = 0;
  let result = null;

  for (let [number, count] of map) {
    if (count > max || (count === max && number < result)) {
      max = count;
      result = number;
    }
  }
  return result.toString();
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));