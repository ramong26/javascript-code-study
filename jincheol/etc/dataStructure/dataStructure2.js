// 문제 링크: [듣보잡](https://www.acmicpc.net/problem/1764)
// 실행: node jincheol/etc/dataStructure/dataStructure2.js

/**
 *
 * @param {number} N 듣도 못한 사람의 수
 * @param {number} M 보도 못한 사람의 수
 * @param {string[]} noListen 듣도 못한 사람들의 이름
 * @param {string[]} noSee 보도 못한 사람들의 이름
 */
const solution = (N, M, noListen, noSee) => {
  const noListenSet = new Set(noListen); // 듣도 못한 사람들을 저장할 Set
  const noListenSee = []; // 듣도 보도 못한 사람들을 저장할 배열

  // 보도 못한 사람 순회
  for (let name of noSee) {
    // 듣도 못한 사람에 포함될 경우 배열에 추가
    if (noListenSet.has(name)) noListenSee.push(name);
  }

  // 사전순 정렬
  noListenSee.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  noListenSee.unshift(noListenSee.length); // 제일 앞에 듣도 보도 못한 사람의 수 추가

  return noListenSee.join('\n'); // 형식에 맞게 출력
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const noListen = input.slice(1, N + 1).map((v) => v.trim());
const noSee = input.slice(N + 1).map((v) => v.trim());
console.log(solution(N, M, noListen, noSee));
