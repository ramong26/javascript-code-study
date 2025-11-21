/*
week25 - 자료구조 - 듣보잡(https://www.acmicpc.net/problem/1764)
김진영이 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때, 듣도 보도 못한 사람의 명단을 구하는 프로그램을 작성하시오.
입력
첫째 줄에 듣도 못한 사람의 수 N, 보도 못한 사람의 수 M이 주어진다. 이어서 둘째 줄부터 N개의 줄에 걸쳐 듣도 못한 사람의 이름과, N+2째 줄부터 보도 못한 사람의 이름이 순서대로 주어진다. 이름은 띄어쓰기 없이 알파벳 소문자로만 이루어지며, 그 길이는 20 이하이다. N, M은 500,000 이하의 자연수이다.
듣도 못한 사람의 명단에는 중복되는 이름이 없으며, 보도 못한 사람의 명단도 마찬가지이다.
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);

  const unHeard = new Set();
  const answer = [];

  // 듣도 못한 사람 저장
  for (let i = 1; i <= N; i++) {
    unHeard.add(lines[i]);
  }

  // 보도 못한 사람 중 듣도 못한 사람에 이미 포함된 사람 찾기
  for (let i = N + 1; i <= N + M; i++) {
    const unSeen = lines[i]
    if (unHeard.has(unSeen)) {
      answer.push(unSeen);
    }
  }

  answer.sort(); 
  return `${answer.length}\n${answer.join('\n')}`;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));