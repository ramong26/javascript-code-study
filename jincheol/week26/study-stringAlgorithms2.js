// 문제 링크: [전화번호 목록](https://www.acmicpc.net/problem/5052)

// 실행: node jincheol/week26/study-stringAlgorithms2.js

/**
 *
 * @param {number} t 테스트 개수
 * @param {string[][]} tCases 테스트 케이스들
 */
const solution = (t, tCases) => {
  const results = [];

  tCases.forEach((testCase) => {
    testCase.sort();

    let isGood = true;
    for (let i = 0; i < testCase.length - 1; i++) {
      const curString = testCase[i];
      const nextString = testCase[i + 1];
      if (nextString.startsWith(curString)) {
        isGood = false;
        results.push('NO');
        break;
      }
    }

    if (isGood) results.push('YES');

    // 시간 초과했던 풀이
    // testCase.sort((a, b) => a - b);

    // let flag = true;
    // for (let i = 0; i < testCase.length; i++) {
    //   if (flag === false) break;

    //   const stringA = testCase[i];
    //   for (let j = i + 1; j < testCase.length; j++) {
    //     if (flag === false) break;
    //     const stringB = testCase[j];
    //     if (stringB.startsWith(stringA)) {
    //       flag = false;
    //       results.push('NO');
    //     }
    //   }
    // }
  });

  return results.join('\n');
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const t = parseInt(input.shift());
const tCases = [];
for (let i = 1; i <= t; i++) {
  const tCaseCount = parseInt(input.shift());
  const tCase = input.splice(0, tCaseCount).map((v) => v.trim());
  tCases.push(tCase);
}
console.log(solution(t, tCases));
