/**
 * 그리디 알고리즘 - 수 묶기
 * 길이가 N인 수열이 주어졌을 때 그 수열의 합이 최대가 나오도록 두 수를 묶었을 때의 합
 */

function solution(input) {
  const lines = input.trim().split('\n')
  const N = parseInt(lines[0]);
  const numbers = [];

  for (let i = 1; i <= N; i++) {
    numbers.push(parseInt(lines[i]));
  }

  // 수 분류하기 (양수, 음수, 1, 0)
  const positive = [];
  const negative = [];
  let ones = 0;  // 1의 개수
  let zeros = 0; // 0의 개수

  for (const num of numbers) {
    if (num > 1) {
      positive.push(num);
    } else if (num === 1) {
      ones++;
    } else if (num === 0) {
      zeros++;
    } else {
      negative.push(num);
    }
  }

  // 정렬하기
  positive.sort((a, b) => b - a);  // 내림차순
  negative.sort((a, b) => a - b);  // 오름차순

  console.log(positive, negative, ones, zeros)

  let result = 0;

  // 1. 양수는 큰 수끼리 묶기
  for (let i = 0; i < positive.length; i += 2) {
    if (i + 1 < positive.length) {
      result += positive[i] * positive[i+1];  // 두개씩 묶어서 곱하기
    } else {
      result += positive[i];  // 마지막 하나 남은 경우 그냥 더하기
    }
  }

  // 2. 음수는 작은수끼리 묶기
  for (let i =0; i < negative.length; i+=2) {
    if (i + 1 < negative.length) {
      result += negative[i] * negative[i+1];  // 두개씩 묶어서 곱하기 (음수->양수)
    } else { 
      if (zeros > 0) {  // 마지막 음수가 하나 남은 경우 0이 있으면 0과 곱해서 제거
        zeros--;  // 0 하나 사용 표시
      } else {
        result += negative[i];
      }
    }
  }
  result += ones;  // 1은 더하기

  return result;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
