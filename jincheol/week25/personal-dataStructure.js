// 문제 링크: [문자열 폭발](https://www.acmicpc.net/problem/9935)

// 실행: node jincheol/week25/personal-dataStructure.js

/**
 *
 * @param {string} strings
 * @param {string} boom
 */
const solution = (strings, boom) => {
  const stack = [];
  const N = boom.length;

  for (let str of strings) {
    stack.push(str);
    if (stack.length < N) continue;

    const checkString = stack.slice(-N).join('');
    let needBoom = checkString === boom;

    while (needBoom) {
      stack.splice(-N);
      if (stack.length < N) {
        needBoom = false;
        break;
      }

      const nextCheck = stack.slice(-N).join('');
      if (nextCheck !== boom) needBoom = false;
    }
  }

  if (stack.length === 0) return 'FRULA';

  return stack.join('');
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
