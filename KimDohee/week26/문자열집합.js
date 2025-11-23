/*
문자열 알고리즘 - 문자열 집합(https://www.acmicpc.net/problem/14425)
총 N개의 문자열로 이루어진 집합 S가 주어진다.
입력으로 주어지는 M개의 문자열 중에서 집합 S에 포함되어 있는 것이 총 몇 개인지 구하는 프로그램을 작성하시오.
*/

// Set 사용
function solution(input) {
  const lines = input.split('\n');
  const [N, M] = lines[0].split(' ').map(Number);
  const set = new Set();

  for (let i = 1; i <= N; i++) {
    set.add(lines[i]);
  }
  
  let count = 0;

  for (let i = N + 1; i <= N + M; i++) {
    if (set.has(lines[i])) {
      count++;
    }
  }

  return count;
}

// object 사용
function solution2(input) {
  const lines = input.split('\n');
  const [N, M] = lines[0].split(' ').map(Number);
  const obj = {};

  for (let i = 1; i <= N; i++) {
    obj[lines[i]] = true;
  }

  let count = 0;
  for (let i = N + 1; i <= N + M; i++) {
    if (obj[lines[i].trim()]) {
      count++;
    }
  }
  return count;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));