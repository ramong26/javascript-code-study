// 문제 링크: [다각형의 면적](https://www.acmicpc.net/problem/2166)

// 실행: node jincheol/week28/study-geometrical2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
