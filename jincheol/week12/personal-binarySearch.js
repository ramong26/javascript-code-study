// 문제 링크: [수 이어 쓰기2](https://www.acmicpc.net/problem/1790)

// 실행: node jincheol/week12/personal-binarySearch.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week12/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 *
 * @param {number} N 1부터 N까지의 수를 이어씀
 * @param {number} k 이어쓴 수의 K번째 자리 숫자
 */
const solution = (N, k) => {
  if (calcLen(N) < k) return -1; // k가 N까지의 수의 길이보다 클 경우 -1 return

  let answer = 0; // 최종 답
  let target = 0; // k번째 자리가 포함된 수
  let left = 1; // 최솟값
  let right = N; // 최댓값

  // k번째 자릿수를 포함하는 수를 찾기 위한 이분 탐색
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 중간값
    const len = calcLen(mid); // 중간값까지의 길이를 구함

    // mid까지의 길이가 목표하는 수보다 같거나 클 경우 (k가 mid에 속하거나 왼쪽에 존재)
    if (len >= k) {
      target = mid; // k번째 자리가 포함된 수 후보기 때문에 target에 할당
      right = mid - 1; // 더 작은 숫자가 있는지 확인하기 위해 최댓값 감소
    } else {
      // mid까지의 길이가 목표하는 자리보다 작을 경우 (k가 mid보다 오른쪽에 존재)
      left = mid + 1; // 더 큰 숫자를 찾기 위해 최솟값 증가
    }
  }

  const leftNumbersLen = calcLen(target - 1); // k번째 자리가 포함된 수의 전까지의 길이를 구함
  // k에서 leftNumbersLen를 뺸 나머지가 target 숫자에서의 자릿수임 (인덱스를 구해야 하므로 -1)
  const idx = k - leftNumbersLen - 1;
  answer = target.toString()[idx]; // k번째 수를 answer에 할당

  return answer;
};

/**
 *
 * @param {number} num 목표하는 숫자
 * @returns {number} 1부터 num까지의 길이
 */
const calcLen = (num) => {
  if (num === 0) return 0;

  const digits = num.toString().length; // 현재 숫자의 자릿수
  let len = 0; // 최종 길이

  // 현재 숫자의 자릿수보다 낮은 자릿수까지 순회
  // 현재 숫자가 3자릿수면 2자릿수 까지의 길이 구하기
  for (let i = 1; i < digits; i++) {
    const count = 9 * Math.pow(10, i - 1); // 9, 90, 900, ...
    // 최종 길이에 i 자릿수 숫자들의 개수를 더함
    len += count * i; // 자릿수의 숫자 개수 * i (길이를 구해야하기 때문에 i를 곱함)
  }

  // 현재 자릿수에 해당하는 숫자들의 길이를 더함
  // e.g. num = 120일 때, 100 ~ 120까지의 숫자 개수 * 3
  const startNum = Math.pow(10, digits - 1); // 자릿수의 첫번째 숫자
  // num과 동일한 자릿수의 숫자들의 길이 더하기 (num이 포함되어야 하기 때문에 startNum + 1)
  // e.g. num = 120일 때 120 - 100 + 1 = 21 -> 21 * 3 = 63
  len += (num - startNum + 1) * digits;

  return len;
};

const [N, k] = input[0].split(' ').map(Number);
console.log(solution(N, k));
