// 문제 링크: [선 긋기](https://www.acmicpc.net/problem/2170)

// 실행: node jincheol/week28/personal-geometrical.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
