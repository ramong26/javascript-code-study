// 문제 링크: [퇴사](https://www.acmicpc.net/problem/14501)

// 실행: node jincheol/week11/study-bruteForce2.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week11/input2.txt')
  .toString()
  .trim()
  .split('\n');

const N = parseInt(input.shift());
const works = [];

// input 가공 -> [걸리는 날, 비용]
for (const work of input) works.push(work.split(' ').map(Number));

let maxProfit = 0; // 최대 이익 변수

/**
 *
 * @param {number} index 현재 날짜, 인덱스 형식 (포인터)
 * @param {number} curProfit 현재까지의 이익
 * @returns
 */
const dfs = (index, curProfit) => {
  // 현재 날짜가 N - 1 보다 큰 경우 종료 (인덱스 형식이라 - 1)
  if (index > N - 1) {
    maxProfit = Math.max(maxProfit, curProfit); // 최대 이익 계산
    return;
  }

  // 현재 날짜에 해당하는 업무에 대한 소요 시간과 이익
  const [days, profit] = works[index];
  // 현재 날짜에 해당하는 업무를 수행하는 경우
  // 이 업무를 한다고 했을 때 종료 날짜가 최대 날짜보다 크면 수행하지 못함
  if (index + days <= N) {
    dfs(index + days, curProfit + profit);
  }

  // 현재 날짜에 해당하는 업무를 수행하지 않는 경우
  dfs(index + 1, curProfit);
};

dfs(0, 0);

console.log(maxProfit);
