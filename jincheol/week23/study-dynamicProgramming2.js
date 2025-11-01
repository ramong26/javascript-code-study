// 문제 링크: [점프](https://www.acmicpc.net/problem/1890)

// 실행: node jincheol/week23/study-dynamicProgramming2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
