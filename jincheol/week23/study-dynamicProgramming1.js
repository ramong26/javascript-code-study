// 문제 링크: [크리보드](https://www.acmicpc.net/problem/11058)

// 실행: node jincheol/week23/study-dynamicProgramming3.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
