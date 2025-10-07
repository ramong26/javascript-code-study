// 문제 링크: [A와 B 2](https://www.acmicpc.net/problem/12919)

// 실행: node jincheol/week19/personal-greedy3.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week19/input3.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * T -> S 역순으로 변환하기, 조건 2개 모두 적용 가능한 경우가 있기에 DFS 사용
 * @param {string} S 시작 문자열
 * @param {string} T 목표하는 문자열
 */
const solution = (S, T) => {
  let answer = 0; // 가능 여부

  /**
   *
   * @param {string} curStr 현재 문자열
   * @returns
   */
  const dfs = (curStr) => {
    if (answer === 1) return;
    if (curStr.length === S.length) {
      if (curStr === S) answer = 1;
      return;
    }

    if (curStr.endsWith('A')) {
      dfs(curStr.slice(0, -1));
    }

    if (curStr.startsWith('B')) {
      const nextStr = curStr.slice(1).split('').reverse().join('');
      dfs(nextStr);
    }
  };

  dfs(T);

  return answer;
};

const [S, T] = input.map((v) => v.trim());
console.log(solution(S, T));
