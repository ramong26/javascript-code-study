// 문제 링크: [이항 계수 2](https://www.acmicpc.net/problem/11051)

// 실행: node jincheol/week27/study-math2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
