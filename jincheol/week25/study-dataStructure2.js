// 문제 링크: [최소 힙](https://www.acmicpc.net/problem/1927)

// 실행: node jincheol/week25/study-dataStructure2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
