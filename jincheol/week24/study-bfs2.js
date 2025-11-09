// 문제 링크: [물통](https://www.acmicpc.net/problem/2251)

// 실행: node jincheol/week24/study-bfs2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
