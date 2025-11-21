// 문제 링크: [전화번호 목록](https://www.acmicpc.net/problem/5052)

// 실행: node jincheol/week26/study-stringAlgorithms2.js

/**
 *
 * @param {number} t 테스트 개수
 * @param {string[][]} tCases 테스트 케이스들
 */
const solution = (t, tCases) => {
  const results = []; // 테스트 케이스들의 결과를 저장할 배열

  // 테스트 케이스들 순회
  tCases.forEach((testCase) => {
    testCase.sort(); // 사전순 정렬
    // 이유: A가 B의 접두사인 관계(A < B)가 존재한다면, 사전식 순서로 정렬했을 때 A와 B 사이에 다른 문자열 C가 끼어들 수 없다.
    // 만약 A < C < B라면, A가 B의 접두사라는 조건에 의해 A는 C의 접두사도 되어야만 한다.
    // 예시: A="911", B="91125426"
    // A와 B 사이에 C="9112"가 있다고 가정. -> A("911") < C("9112") < B("91125426")
    // A와 B 사이에 D="976"가 있다고 가정. -> A("911") < B("91125426") < D("976") (정렬 오류)
    // 따라서 사전순 정렬을 하면 접두사 관계가 성립하는 두 문자열은 반드시 이웃한다.

    let isGood = true; // 일관성이 있는지
    // 테스트 케이스 순회
    for (let i = 0; i < testCase.length - 1; i++) {
      const curString = testCase[i]; // 현재 문자열
      const nextString = testCase[i + 1]; // 다음 문자열
      // 다음 문자열이 현재 문자열로 시작하면
      if (nextString.startsWith(curString)) {
        isGood = false; // 일관성 없음
        results.push('NO'); // 결과 저장
        break; // 조기 종료
      }
    }

    if (isGood) results.push('YES'); // 테스트 케이스 순회 후 일관성이 있으면 결과 저장

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

  return results.join('\n'); // 형식에 맞게 출력
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
