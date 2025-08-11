// 문제 링크: [에너지 모으기](https://www.acmicpc.net/problem/16198)

// 실행: node jincheol/week11/study-bruteForce1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week11/input1.txt')
  .toString()
  .trim()
  .split('\n');

const N = parseInt(input[0]);
const marbles = input[1].split(' ').map(Number);

let energy = 0;

const dfs = (curMarbles, curEnergy) => {
  if (curMarbles.length === 2) {
    energy = Math.max(energy, curEnergy);
    return;
  }

  for (let i = 1; i < curMarbles.length - 1; i++) {
    const leftMarbles = curMarbles.slice(0, i);
    const rightMarbles = curMarbles.slice(i + 1);
    const newMarbles = leftMarbles.concat(rightMarbles);

    const newEnergy = curEnergy + curMarbles[i - 1] * curMarbles[i + 1];
    dfs(newMarbles, newEnergy);
  }
};

dfs(marbles, 0);

console.log(energy);
