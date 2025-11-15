// 문제 링크: [문자열 폭발](https://www.acmicpc.net/problem/9935)

// 실행: node jincheol/week25/personal-dataStructure.js

/**
 *
 * @param {string} strings // 문자열
 * @param {string} boom // 폭발 문자열
 */
const solution = (strings, boom) => {
  const stack = []; // 문자열을 하나씩 저장할 스택
  const N = boom.length; // 폭발 문자열의 길이

  // 문자열을 하나씩 스택에 추가하며 확인
  for (let str of strings) {
    stack.push(str); // 스택에 추가
    if (stack.length < N) continue; // 스택의 길이가 N보다 작으면 터질 수 없음

    // 스택의 길이가 N이상이면 폭발 문자열 확인
    const checkString = stack.slice(-N).join(''); // 스택에서 뒤에서 N개의 문자열 확인
    let needBoom = checkString === boom; // 폭발이 필요한 경우 (폭발 문자열인 경우)
    // while 문으로 폭발시켰을 때 또 폭발 문자열이 생기는지 확인
    while (needBoom) {
      stack.splice(-N); // 폭발 (스택에서 제거)
      // 스택의 길이가 N 미만이면 폭발할 수 없음
      if (stack.length < N) {
        needBoom = false; // 플래그 변경
        break; // 종료
      }

      const nextCheck = stack.slice(-N).join(''); // 폭발 문자열이 생기는지 확인
      if (nextCheck !== boom) needBoom = false; // 폭발 문자열이 아니면 플래그 변경
    }
  }

  if (stack.length === 0) return 'FRULA'; // 스택에 남은 문자열이 없는 경우

  return stack.join(''); // 스택의 문자열 반환
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const strings = input[0].trim();
const boom = input[1];
console.log(solution(strings, boom));
