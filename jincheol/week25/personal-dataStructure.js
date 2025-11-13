// 문제 링크: [폭발 문자열](https://www.acmicpc.net/problem/9935)

// 실행: node jincheol/week25/personal-dataStructure.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
