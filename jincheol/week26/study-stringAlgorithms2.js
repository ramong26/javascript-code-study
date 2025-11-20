// 문제 링크: [전화번호 목록](https://www.acmicpc.net/problem/5052)

// 실행: node jincheol/week26/study-stringAlgorithms2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
